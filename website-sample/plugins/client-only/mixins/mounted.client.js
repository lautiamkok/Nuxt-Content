'use strict'

import Vue from 'vue'
import $ from 'jquery'
import Swiper from 'swiper/bundle'

Vue.mixin({
  async mounted () {
    // Check if it is a page.
    const isPage = this.$options.parent !== undefined && this.$options.parent.name === 'page'
    if (isPage !== true) {
      return
    }

    // Only add anything below once.

    // Find the form element before applying ZF.
    // window.element = document.querySelector('.form-submit')
    // console.log('Finding form element:', window.element)
    $(document).foundation()

    // Fade in the swiper arrow buttons.
    $('.row-swiper, .row-swiper-article').hover(function () {
      var selector = $('.swiper-arrow')
      $(selector).fadeIn('fast')
    }, function () {
      var selector = $('.swiper-arrow')
      $(selector).fadeOut('fast', function () {
        // callback
      })
    })

    // Attach swiper to the container.
    var swiperSlide = new Swiper('.row-swiper .swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      loop: true,
      grabCursor: true,
      freeMode: false,
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: '.row-swiper .swiper-button-next',
        prevEl: '.row-swiper .swiper-button-prev',
      },
      pagination: {
        el: '.row-swiper .swiper-pagination',
        clickable: true,
      },
      autoHeight: true
    })
  }
})
