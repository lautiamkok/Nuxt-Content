
console.log('nuxt.config.js:process.env.BASE_URL =', process.env.BASE_URL)

// Only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/nuxt-content/',

    // https://nuxtjs.org/api/configuration-router#linkactiveclass
    linkActiveClass: 'current'
  }
} : {
  router: {
    linkActiveClass: 'current'
  }
}

export default {
  ...routerBase,

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  // target: 'server',
  target: 'static',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    // LESS files in the project.
    'assets/less/main.less',
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/utils.js',
    '~/plugins/client-only/foundation.client.js', //  client side only
    '~/plugins/client-only/aos.client.js', // client side only
    '~/plugins/client-only/mixins/mounted.client.js', // client side only
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxt/content'
  ],

  content: {
    apiPrefix: 'api'
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },

  // The env property defines environment variables that should be
  // available on the client side.
  // https://nuxtjs.org/api/configuration-env#the-env-property
  env: {
    // This lets you create a baseUrl property that will be equal to
    // the BASE_URL environment variable if defined, otherwise, equal
    // to 'http://localhost:3000'
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  // Use if-condition to inject this instead.
  // https://nuxtjs.org/api/configuration-router#linkactiveclass
  // router: {
  //   linkActiveClass: 'current'
  // },

  // Generate 404 page.
  // https://nuxtjs.org/api/configuration-generate#fallback
  generate: {
    fallback: true,
  }
}
