import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      name: 'firefox',
      provider: 'playwright',
      // https://playwright.dev
      providerOptions: {},
    },
  },
})
