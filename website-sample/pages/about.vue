<template>

  <!-- row -->
  <div class="row">
    <div class="grid-container">
      <div class="grid-x grid-padding-x">

        <!-- cell -->
        <div class="large-shrink medium-6 cell">

          <div data-aos="fade-in">
            <img :src="$loadAssetImage(page.featuredImage.file)" :alt="page.title">
          </div>

        </div>
        <!-- cell -->

        <!-- cell -->
        <div class="large-auto medium-6 cell">

          <div class="container-text-about" data-aos="fade-up">
            <nuxt-content :document="page" />
          </div>

        </div>
        <!-- cell -->

      </div>
    </div>

  </div>
  <!-- row -->

</template>

<script>
export default {
  async asyncData ({ $content, error }) {
    try {
      const page = await $content('articles', 'about').fetch()
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
      meta: [
        // hid is used as unique identifier.
        { hid: 'description', name: 'description', content: this.page.description }
      ]
    }
  },
}
</script>
