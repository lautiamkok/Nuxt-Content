<template>

  <!-- row -->
  <div class="row" v-if="projects">
    <div class="grid-container">
      <div class="grid-x grid-padding-x">

        <!-- vue - loop -->
        <!-- cell -->
        <div class="medium-6 small-12 cell" v-for="project in projects" :key="project.slug">

          {{ project.slug }}

          <div class="container-card" v-on:click="triggerLink($event)" data-aos="fade-up">
            <div class="card card-work image-background flex-centre" v-bind:style="{'background-image': 'url(' + $loadAssetImage(project.featuredImage.file) + ')' }">
              <img :src="$loadAssetImage(project.featuredImage.file)" :alt="project.title">
              <div class="layer"></div>
              <div class="flex-centre-vh">
                <p class="card-excerpt">{{ project.excerpt }}</p>
              </div>

            </div>
            <div class="card-section">
              <h2 class="card-heading"><nuxt-link :to="'/projects-nested/' + project.slug" v-html="project.title"></nuxt-link></h2>
            </div>
          </div>

        </div>
        <!-- cell -->
        <!-- vue - loop -->

        <div class="small-12 cell" v-if="projects.length == 0">
          <p>No projects found.</p>
        </div>

      </div>
    </div>

  </div>
  <!-- row -->

</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      projects: [],
    }
  },

  async fetch () {
    // Get the page number from the params.
    const postsPerPage = 2
    const number = this.$route.params.number
    const pageNumber = number === undefined ? 1 : parseInt(number)
    const skip = number === undefined ? 0 : (pageNumber - 1) * postsPerPage
    console.log('components/projects-nested/nested-project-items.vue: pageNumber =', pageNumber)
    console.log('components/projects-nested/nested-project-items.vue: skip =', skip)

    try {
      this.projects = await this.$content('projects').skip(skip).limit(postsPerPage).fetch()
    } catch (err) {
      throw new Error(err.message)
    }
  },

  // define methods under the `methods` object
  methods: {
    // v-on:click="triggerLink('/projects-nested/' + post.slug, $event)"
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
