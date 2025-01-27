<template>
  <div class="h-screen w-screen bg-gray-300 flex items-center justify-center overflow-hidden">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800">REGISTER</h2>
      <form class="mt-6">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your full name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Create a password"
          />
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
