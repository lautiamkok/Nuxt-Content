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

    <ProjectItems />

  </div>

</template>

<script>

export default {
  async asyncData ({ $content, error }) {
    try {
      const page = await $content('articles', 'projects').fetch()
      return {
        page
      }
    } catch (err) {
      return error({
        statusCode: 404,
        message: err.message
      })
    }
  },

  head () {
    return {
      title: this.page.title,
    }
  },
}
</script>
