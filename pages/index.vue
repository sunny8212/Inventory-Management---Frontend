<template>
  <div
    class="h-screen w-screen bg-gray-300 flex items-center justify-center overflow-hidden"
  >
    <div class="bg-white shadow-2xl rounded-4xl p-10 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800">LOGIN</h2>
      <form class="mt-8" @submit.prevent="login">
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
        <NuxtLink to="/register" class="text-blue-500 hover:underline"
          >Sign Up</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { useRuntimeConfig, useFetch, useState, navigateTo } from '#imports'

const email = ref('')
const password = ref('')

async function login() {
  try {
    const { public: { apiBase } } = useRuntimeConfig()

    const { data, error } = await useFetch('/api/auth/login', {
      baseURL: apiBase,
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (error.value) {
      alert(
        "Login failed: " +
          (error.value.data?.message || error.value.message)
      )
      return
    }

    const token = data.value?.token
    const user = data.value?.user

    if (token && user) {
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      useState('user').value = user

      await nextTick() // Ensures state is updated before navigating

      // Redirect based on role
      if (user.role === 'Admin' || user.role === 'Manager' || user.role === 'Viewer') {
        navigateTo('/dashboard')
      } else {
        alert('Unauthorized role!')
      }
    } else {
      alert('Token not found in response!')
    }
  } catch (error) {
    console.error('Unexpected error during login:', error)
    alert('An unexpected error occurred!')
  }
}
</script>

