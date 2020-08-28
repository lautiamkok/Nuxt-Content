<template>

  <div>

    <!-- row -->
    <div class="row">
      <div class="grid-container">
        <div class="grid-x grid-padding-x">
          <div class="small-12 cell">
            <h1>{{ page.title }}</h1>
          </div>
        </div>
      </div>

    </div>
    <!-- row -->

    <nuxt-child :key="$route.params.number" />

    <!-- row -->
    <div class="row row-pager" v-if="totalPages && ($route.name == 'projects-nested' || $route.name == 'projects-nested-pages-number')">
      <div class="grid-container">

        <div class="grid-x grid-padding-x">

          <!-- cell -->
          <div class="cell small-4">
            <nuxt-link :to="'/projects-nested/pages/' + prevPage" class="hollow button secondary" v-if="prevPage">
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
            <nuxt-link :to="'/projects-nested/pages/' + nextPage" class="hollow button secondary" v-if="nextPage">
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

export default {
  async asyncData ({ $content, error, route }) {
    const postsPerPage = 2
    const number = route.params.number

    try {
      const page = await $content('articles', 'projects').fetch()

      const allProjects = await $content('projects').fetch()
      const totalPosts = allProjects.length
      const totalPages = Math.ceil(totalPosts / postsPerPage)
      const currentPage = number === undefined ? 1 : parseInt(number)
      const nextPage = currentPage === totalPages ? null : currentPage + 1
      const prevPage = currentPage === 1 ? null : currentPage - 1

      console.log('pages/projects-nested.vue: nextPage =', nextPage)
      console.log('pages/projects-nested.vue: prevPage =', prevPage)

      return {
        page,
        totalPages,
        currentPage,
        nextPage,
        prevPage,
      }
    } catch (err) {
      return error({
        statusCode: 404,
        message: err.message
      })
    }
  },

  watch: {
    '$route.path': function() {
      const number = this.$route.params.number
      this.currentPage = number === undefined ? 1 : parseInt(number)
      this.nextPage = this.currentPage === this.totalPages ? null : this.currentPage + 1
      this.prevPage = this.currentPage === 1 ? null : this.currentPage - 1
    }
  },

  head () {
    return {
      title: this.page.title,
    }
  },

  scrollToTop: false,
}
</script>
