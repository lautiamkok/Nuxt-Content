<template>

  <!-- row -->
  <div class="row">
    <div class="grid-container full-height">
      <div class="grid-x grid-padding-x small-padding-collapse full-height">

        <div class="small-10 cell small-offset-1">

          <!-- row swiper -->
          <div class="row row-swiper autoheight" v-if="page.slideImages" data-aos="fade-in">

            <!-- Swiper -->
            <div class="swiper-container">

              <div class="swiper-wrapper">

                <!-- vue - loop -->
                <template v-for="slide in page.slideImages">

                  <div class="swiper-slide">
                    <nuxt-link :to="slide.link"><img :src="$loadAssetImage(slide.file)" :alt="slide.alt"></nuxt-link>
                  </div>

                </template>
                <!-- vue - loop -->

              </div>

              <!-- Add Arrows -->
              <div class="swiper-button-next use-default swiper-button-white swiper-arrow"></div>
              <div class="swiper-button-prev use-default swiper-button-white swiper-arrow"></div>

            </div>
            <!-- Swiper -->

            <!-- Add Pagination -->
            <div class="container-pagination">
              <div class="grid-x grid-padding-x align-middle full-height small-padding-collapse">
                <div class="swiper-pagination small-12 cell align-self-middle"></div>
              </div>
            </div>

          </div>
          <!-- row swiper -->

        </div>

      </div>
    </div>

  </div>
  <!-- row -->

</template>

<script>
export default {
  async asyncData ({ $content, error }) {
    try {
      const page = await $content('articles', 'home').fetch()
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
      // Disable template.
      titleTemplate: null
    }
  },
}
</script>
