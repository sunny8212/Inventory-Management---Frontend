<template>
  <div>
    <Navbar />
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4 flex justify-center">Dashboard</h2>
      <p class="flex justify-center">Welcome, {{ user?.name || 'Guest' }}!</p>
      <!-- Add additional dashboard content -->
    </div>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';

definePageMeta({
  middleware: 'auth',
  role: ['Admin', 'Manager'], // Only Admin and Manager roles can access this page
});

// Apply role-based middleware
useRouteMiddleware(() => {
  const user = useState('user').value;

  // Redirect if the user is not an Admin or Manager
  if (!user || (user.role !== 'Admin' && user.role !== 'Manager')) {
    alert('Access denied!');
    return navigateTo('/');
  }
});

// Access the global user state
const user = useState('user').value;
</script>
