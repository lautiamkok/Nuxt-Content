<template>

  <div>

    <!-- row -->
    <div class="row" v-if="projects">
      <div class="grid-container">
        <div class="grid-x grid-padding-x">

          <!-- vue - loop -->
          <template v-for="project in projects">

            <!-- cell -->
            <div class="medium-6 small-12 cell">

              <!-- <nuxt-link :to="item.link" target="_blank"> -->

              <div class="container-card" v-on:click="triggerLink($event)" data-aos="fade-up">
                <div class="card card-work image-background flex-centre" v-bind:style="{'background-image': 'url(' + $loadAssetImage(project.featuredImage.file) + ')' }">
                  <img :src="$loadAssetImage(project.featuredImage.file)" :alt="project.title">
                  <div class="layer"></div>
                  <div class="flex-centre-vh">
                    <p class="card-excerpt">{{ project.excerpt }}</p>
                  </div>

                </div>
                <div class="card-section">
                  <h2 class="card-heading"><nuxt-link :to="'/projects/' + project.slug" v-html="project.title"></nuxt-link></h2>
                </div>
              </div>

            </div>
            <!-- cell -->

          </template>
          <!-- vue - loop -->

          <div class="small-12 cell" v-if="projects.length == 0">
            <p>No projects found.</p>
          </div>

        </div>
      </div>

    </div>
    <!-- row -->

    <!-- row -->
    <div class="row row-pager" v-if="projects">
      <div class="grid-container">

        <div class="grid-x grid-padding-x">

          <!-- cell -->
          <div class="cell small-4">
            <nuxt-link :to="'/projects/pages/' + prevPage" class="hollow button secondary" v-if="prevPage">
              Previous
            </nuxt-link>
          </div>
          <!-- cell -->

          <!-- cell -->
          <div class="cell small-4 text-center">
            <p v-if="currentPage && totalPages">{{ currentPage }} of {{ totalPages }}</p>
          </div>
          <!-- cell -->

          <!-- cell -->
          <div class="cell small-4 text-right">
            <nuxt-link :to="'/projects/pages/' + nextPage" class="hollow button secondary" v-if="nextPage">
              Next
            </nuxt-link>
          </div>
          <!-- cell -->

        </div>

      </div>

    </div>
    <!-- row -->

  </div>

</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      projects: [],
      totalPages: null,
      currentPage: null,
      nextPage: null,
      prevPage: null,
    }
  },

  async fetch () {
    // Get the page number from the params.
    const postsPerPage = 6
    const number = this.$route.params.number
    const pageNumber = number === undefined ? 1 : parseInt(number)
    const skip = number === undefined ? 0 : (pageNumber - 1) * postsPerPage
    console.log('pages/projects/index.vue: pageNumber =', pageNumber)
    console.log('pages/projects/index.vue: skip =', skip)

    try {
      this.projects = await this.$content('projects').skip(skip).limit(postsPerPage).fetch()

      const allProjects = await this.$content('projects').fetch()
      let totalPosts = allProjects.length
      let totalMaxPages = Math.ceil(totalPosts / postsPerPage)

      this.totalPages = totalMaxPages
      this.currentPage = pageNumber
      this.nextPage = pageNumber === totalMaxPages ? null : pageNumber + 1
      this.prevPage = pageNumber === 1 ? null : pageNumber - 1

      console.log('pages/projects/index.vue: nextPage =', this.nextPage)
      console.log('pages/projects/index.vue: prevPage =', this.prevPage)

    } catch (err) {
      throw new Error(err.message)
    }
  },

  // define methods under the `methods` object
  methods: {
    // v-on:click="triggerLink('/projects/' + project.slug, $event)"
    goTo(route, $event) {
      window.location.href = route
    },

    triggerLink($event) {
      var context = $($event.target).parents('.container-card')
      context.find('a')[0].click()
    }
  }
}
</script>
