<template>
  <div class="h-screen w-screen bg-gray-300 flex items-center justify-center overflow-hidden">
    <div class="bg-white shadow-2xl rounded-4xl p-10 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800">LOGIN</h2>
      <form class="mt-8">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg "
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg  "
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Don't have an account?
        <a href="#" class="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>
  </div>
</template>
