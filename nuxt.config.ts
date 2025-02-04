import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  pages: true,
  runtimeConfig: {
    public: {
      apiBase: 'https://inventory-management-backend-yvvk.onrender.com', // Your backend server URL
    },
  },
  nitro: {
    preset: 'netlify'
  },
  css: ['~/assets/css/main.css'],
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
