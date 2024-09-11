// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {

    public: {
      apiBase: 'http://localhost:3001/api'
    }
  
  },
  
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/sass/main.sass"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "Historic Horizon",
      meta: [{}],
      link: [
        { type: "image/png", rel: "icon", href: "/images/favicon-dark.png" },
      ],
      htmlAttrs: {
        lang: "ru",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    
  },
  vite: {
    test: {
      browser: {
        provider: 'playwright',
        enabled: true,
        name: 'chromium'
      }
    },
  }
});