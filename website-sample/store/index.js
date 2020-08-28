'use strict'

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit }, { $content }) {
    const menu = await $content('menu').only(['items']).fetch()
    commit('setMenu', menu.items)
  }
}
