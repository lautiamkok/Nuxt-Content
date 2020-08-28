<template>

  <!-- article -->
  <div class="row" v-if="page">

    <!--full screen image -->
    <div class="row">
      <div class="grid-container fluid">
        <div class="grid-x grid-padding-x small-padding-collapse">

          <!-- cell -->
          <div class="small-12 cell">

            <div class="image-background image-fullscreen" v-bind:style="{'background-image': 'url(' + $loadAssetImage(page.fullscreen.file) + ')' }" data-aos="fade-in">
              <img :src="$loadAssetImage(page.fullscreen.file)" :alt="page.fullscreen.alt">
            </div>

            <div class="image-description text-right" v-if="page.fullscreen.caption">
              <p v-html="page.fullscreen.caption"></p>
            </div>

          </div>
          <!-- cell -->

        </div>
      </div>

    </div>
    <!--full screen image -->

    <!--text container -->
    <div class="row">
      <div class="grid-container">
        <div class="grid-x grid-padding-x align-center">

          <!-- cell -->
          <div class="large-7 small-12 cell">

            <div class="container-text" data-aos="fade-up">
              <h2 v-html="page.title"></h2>
              <nuxt-content :document="page" />
            </div>

          </div>
          <!-- cell -->

        </div>
      </div>
    </div>
    <!--text container -->

    <!--centralised image -->
    <div class="row">
      <div class="grid-container">
        <div class="grid-x grid-padding-x align-center">

          <!-- vue - loop -->
          <template v-for="item in page.projectImages">

            <!-- cell -->
            <div class="large-5 small-12 cell">
              <div class="container-image" data-aos="fade-up">
                <div class="image-centralised">
                  <img :src="$loadAssetImage(item.file)" :alt="item.alt" class="float-center">
                </div>
                <div class="image-description text-right no-padding-right" v-if="item.caption" v-html="item.caption">
                </div>
              </div>
            </div>
            <!-- cell -->

          </template>
          <!-- vue - loop -->

        </div>
      </div>

    </div>
    <!--centralised image -->

  </div>
  <!-- article -->

</template>

<script>
export default {
  name: 'slug',

  async asyncData ({ $content, error, params }) {
    try {
      const page = await $content('projects', params.slug).fetch()
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

  // https://nuxtjs.org/api/pages-head
  head () {
    return {
      title: this.page.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.page.description }
      ]
    }
  },
}
</script>
