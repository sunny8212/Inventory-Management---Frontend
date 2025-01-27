<template>
  <div
    class="h-screen w-screen bg-gray-300 flex items-center justify-center overflow-hidden"
  >
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800">REGISTER</h2>
      <form class="mt-6" @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your full name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Create a password"
          />
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700"
            >Role</label
          >
          <select
            v-model="role"
            id="role"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select a role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Register
        </button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Already have an account?
        <NuxtLink to="/" class="text-blue-500 hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        // Use runtime config for the backend URL
        const {
          public: { apiBase },
        } = useRuntimeConfig();

        // Send a POST request to the backend
        const { data, error } = await useFetch("/api/auth/register", {
          baseURL: apiBase,
          method: "POST",
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role, // Ensure role is a string, not an object
          }),
        });

        if (error.value) {
          console.error(
            "Registration failed:",
            error.value.data?.message || error.value.message
          );
          alert(
            "Registration failed: " +
              (error.value.data?.message || error.value.message)
          );
        } else {
          console.log("Registration successful:", data.value);
          alert("Registration successful! You can now log in.");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("Unexpected error occurred during registration.");
      }
    },
  },
};
</script>
