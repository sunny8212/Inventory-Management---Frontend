import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // Compatibility date for Nuxt updates
  compatibilityDate: "2024-11-01",

  // Enable development tools for better debugging
  devtools: { enabled: true },

  // Ensure the pages directory is enabled (this is default in Nuxt)
  pages: true,

  // Add global CSS
  css: ['~/assets/css/main.css'],

  // Configure Vite
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // App-level configuration
  app: {
    head: {
      title: "Inventory Management App", // Default page title
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "This is my Nuxt app" },
      ],
    },
  },
});
