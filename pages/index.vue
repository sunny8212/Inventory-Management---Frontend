<template>
  <div class="h-screen w-screen bg-gray-300 flex items-center justify-center overflow-hidden">
    <div class="bg-white shadow-2xl rounded-4xl p-10 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800">LOGIN</h2>
      <form class="mt-8" @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Login
        </button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Don't have an account?
        <NuxtLink to="/register" class="text-blue-500 hover:underline">Sign Up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Use the runtime configuration for the base URL
        const { public: { apiBase } } = useRuntimeConfig();

        const { data, error } = await useFetch('/api/auth/login', {
          baseURL: apiBase,
          method: 'POST',
          body: {
            email: this.email,
            password: this.password,
          },
        });

        if (error.value) {
          console.error("Login failed:", error.value.data?.message || error.value.message);
          alert("Login failed!");
        } else {
          console.log("Login successful:", data.value);

          // Store token in local storage
          const token = data.value?.token; // Adjust the key according to your API response
          if (token) {
            localStorage.setItem('authToken', token);
            alert("Login Successful!");
          } else {
            console.error("Token not found in the response.");
            alert("Unexpected error: Token not found.");
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred!");
      }
    },
  },
};
</script>
