<template>
  <div class="p-6 flex flex-col items-center bg-zinc-300 min-h-screen">
    <h2 class="text-4xl font-bold mb-4 text-center text-indigo-700">Dashboard</h2>
    <p class="text-lg text-gray-600">Welcome, {{ user?.name || 'Guest' }}!</p>
    <span v-if="user?.role" class="text-sm text-gray-500">Role: {{ user?.role }}</span>
    <NuxtLink to="/" @click.prevent="handleLogout" class="mt-4 w-full sm:w-auto bg-red-500 text-white py-2 px-2 rounded-lg shadow-md hover:bg-red-800 transition">
      Logout
    </NuxtLink>

    <!-- Admin Section -->
    <div v-if="user?.role === 'Admin'" class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">Admin Section</h3>
      <p class="text-lg text-gray-700 mb-4">You have full access to all resources.</p>

      <div class="space-x-4">
        <button @click="showModal = true" class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">Manage Users</button>
        <button @click="showReports = true" class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">View Reports</button>
        <button class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">View System Statistics</button>
      </div>

      <!-- Admin Modal: Add User or Resource -->
      <div v-if="showModal" class="w-full max-w-4xl bg-white rounded-lg p-6 mt-6 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 py-6">
          <h3 class="text-xl font-semibold mb-4">Create New User/Resource</h3>
          <input v-model="newResource.name" type="text" placeholder="Resource Name" class="w-full mb-4 p-2 border border-gray-300 rounded flex" />
          <div class="flex justify-end space-x-4">
            <button @click="createResource" class=" mt-2 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-900 transition">Create</button>
            <button @click="showModal = false" class="mt-2 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-900 transition">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Manager Section -->
    <div v-else-if="user?.role === 'Manager'" class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 class="text-2xl font-semibold text-green-700 mb-4">Manager Section</h3>
      <p class="text-lg text-gray-700 mb-4">You have access to manage resources but not full administrative control.</p>

      <div class="space-x-4">
        <button class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition">Manage Resources</button>
        <button @click="showReports = true" class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition">View Reports</button>
        <button class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition">Allocate Resources</button>
      </div>
    </div>

    <!-- Viewer Section -->
    <div v-else-if="user?.role === 'Viewer'" class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 class="text-2xl font-semibold text-gray-700 mb-4">Viewer Section</h3>
      <p class="text-lg text-gray-700 mb-4">You have view-only access to resources.</p>
      <button @click="showReports = true" class="w-full sm:w-auto bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md">View Reports</button>
    </div>

    <!-- Unauthorized Access Section -->
    <div v-else class="w-full max-w-4xl bg-red-100 p-4 mt-6 rounded-lg">
      <p class="text-red-500 text-lg font-semibold">Unauthorized access: Your role does not have permission to access this page.</p>
    </div>

    <!-- Reports Table -->
    <div v-if="showReports" class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">Dummy Data Table</h3>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border">1</td>
            <td class="px-4 py-2 border">Resource A</td>
            <td class="px-4 py-2 border">Active</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">2</td>
            <td class="px-4 py-2 border">Resource B</td>
            <td class="px-4 py-2 border">Inactive</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">3</td>
            <td class="px-4 py-2 border">Resource C</td>
            <td class="px-4 py-2 border">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth', // Apply the custom middleware
});

const user = useState('user').value; // Access global user state
const showModal = ref(false); // To control the visibility of the modal
const newResource = ref({ name: '' }); // New resource object
const showReports = ref(false); // To toggle the visibility of the reports table

// Function to create a new resource (could be user, item, etc.)
function createResource() {
  console.log('Creating new resource:', newResource.value.name);
  // Here you would typically call an API to create the resource
  showModal.value = false;
  newResource.value.name = ''; // Reset input field
}
function handleLogout() {
  alert('You have logged out!');
}
</script>
