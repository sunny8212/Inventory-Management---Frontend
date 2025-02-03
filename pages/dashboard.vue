<template>
  <div class="p-6 flex flex-col items-center bg-zinc-300 min-h-screen">
    <h2 class="text-4xl font-bold mb-4 text-center text-indigo-700">
      {{ user?.role }} Dashboard
    </h2>
    <p class="text-lg text-gray-600">Welcome, {{ user?.name || "Guest" }}!</p>
    <!-- <span v-if="user?.role" class="text-sm text-gray-500">Role: {{ user?.role }}</span> -->
    <div class="relative p-6 max-w-7xl mx-auto">
      <!-- Logout Button -->
      <NuxtLink
        to="/"
        @click.prevent="handleLogout"
        class="absolute bottom-20 left-90 bg-red-500 text-white py-2 px-2 rounded-lg shadow-md hover:bg-red-300 transition"
      >
        Logout
      </NuxtLink>
    </div>

    <!-- Admin Section -->
    <div
      v-if="user?.role === 'Admin'"
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">Admin Section</h3>
      <p class="text-lg text-gray-700 mb-4">
        You have full access to all resources.
      </p>

      <div class="space-x-4">
        <button
          @click="showModal = true"
          class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Manage Users
        </button>
        <button
          @click="showReports = true"
          class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View Reports
        </button>
        <button
          class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View System Statistics
        </button>
      </div>

      <!-- Admin Modal: Add User or Resource -->
      <div
        v-if="showModal"
        class="w-full max-w-4xl bg-white rounded-lg p-6 mt-6 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 py-6">
          <h3 class="text-xl font-semibold mb-4">Create New User/Resource</h3>
          <input
            v-model="newResource.name"
            type="text"
            placeholder="Resource Name"
            class="w-full mb-4 p-2 border border-gray-300 rounded flex"
          />
          <div class="flex justify-end space-x-4">
            <button
              @click="createResource"
              class="mt-2 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-900 transition"
            >
              Create
            </button>
            <button
              @click="showModal = false"
              class="mt-2 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-900 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Manager Section -->
    <div
      v-else-if="user?.role === 'Manager'"
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-green-700 mb-4">
        Manager Section
      </h3>
      <p class="text-lg text-gray-700 mb-4">
        You have access to manage resources but not full administrative control.
      </p>

      <div class="space-x-4">
        <button
          class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Manage Resources
        </button>
        <button
          @click="showReports = true"
          class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          View Reports
        </button>
        <button
          class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Allocate Resources
        </button>
      </div>
    </div>

    <!-- Viewer Section -->
    <div
      v-else-if="user?.role === 'Viewer'"
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-gray-00 mb-4">Client Section</h3>
      <div class="space-x-4">
        <button
          @click="addNewProduct = true"
          class="w-full sm:w-auto bg-zinc-500 text-white py-2 px-4 rounded-lg shadow-md"
        >
          Add New Product
        </button>

        <button
          @click="showAllProduct = true"
          class="w-full sm:w-auto bg-zinc-500 text-white py-2 px-4 rounded-lg shadow-md"
        >
          View All Product
        </button>
      </div>
    </div>

    <!-- Unauthorized Access Section -->
    <div v-else class="w-full max-w-4xl bg-red-100 p-4 mt-6 rounded-lg">
      <p class="text-red-500 text-lg font-semibold">
        Unauthorized access: Your role does not have permission to access this
        page.
      </p>
    </div>

    <!-- Reports Table -->
    <div
      v-if="showReports"
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">
        Dummy Data Table
      </h3>
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

    <div
      v-if="addNewProduct"
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">
        Enter Product details
      </h3>
      <form @submit.prevent="handleNewProductSubmit" class="space-y-4">
        <h2 class="text-xl font-bold">
          {{ isEditMode ? "Edit Product" : "Add Product" }}
        </h2>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="product.name"
            type="text"
            id="name"
            placeholder="Enter product name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="sku" class="block text-sm font-medium text-gray-700"
            >SKU</label
          >
          <input
            v-model="product.sku"
            type="text"
            id="sku"
            placeholder="Enter SKU"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700"
            >Category</label
          >
          <input
            v-model="product.category"
            type="text"
            id="category"
            placeholder="Enter category"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="quantity" class="block text-sm font-medium text-gray-700"
            >Quantity</label
          >
          <input
            v-model.number="product.quantity"
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Price</label
          >
          <input
            v-model.number="product.price"
            type="number"
            step="0.01"
            id="price"
            placeholder="Enter price"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="supplier" class="block text-sm font-medium text-gray-700"
            >Supplier Information</label
          >
          <input
            v-model="product.supplier"
            type="text"
            id="supplier"
            placeholder="Enter supplier information"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700"
            >Status</label
          >
          <select
            v-model="product.status"
            id="status"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ isEditMode ? "Update Product" : "Add Product" }}
        </button>
      </form>
    </div>

    <div
      v-if="showAllProduct"
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <div
        v-if="products.some((p) => p.isLowStock)"
        class="bg-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mt-4"
      >
        ⚠️ Warning: Some products have low stock!
      </div>

      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">All Products</h3>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SKU
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Supplier
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(product, index) in products"
            :key="index"
            :class="{ 'bg-red-200': product.isLowStock }"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ product.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.sku }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.category }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              ${{ product.price.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.supplier }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  product.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                ]"
              >
                {{ product.status }}
              </span>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
            >
              <button
                @click="editProduct(product)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button @click="deleteProduct(product._id || product.id)" class="text-red-600 hover:text-red-900">
  Delete
</button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();


const user = ref(null); // Access global user state
const showModal = ref(false); // To control the visibility of the modal
const newResource = ref({ name: "" }); // New resource object
const showReports = ref(false); // To toggle the visibility of the reports table
const addNewProduct = ref(false); // To add new product form visibility
const showAllProduct = ref(false); // To view all products
const isEditMode = ref(false); // Track edit mode
const products = ref([]); // Store the list of products
const lowStockThreshold = 5; // Set stock threshold


// Define the product state
const product = reactive({
  name: "",
  sku: "",
  category: "",
  quantity: 0,
  price: 0,
  supplier: "",
  status: "active",
});

// Function to create a new resource (could be user, item, etc.)
function createResource() {
  console.log("Creating new resource:", newResource.value.name);
  showModal.value = false;
  newResource.value.name = ""; // Reset input field
}

// Logout function
function handleLogout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user"); // Clear user from storage
  user.value = null; // Reset user state
  alert("You have been logged out successfully.");
}

// Function to submit new product data to backend
const handleNewProductSubmit = async () => {
  try {
    console.log("Submitting product:", product);

    const response = await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (response.ok) {
      addNewProduct.value = false; // Close form modal
      resetProductForm();
      fetchProducts(); // Refresh product list
    } else {
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Function to fetch all products
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/products");
    const data = await response.json();
    if (response.ok) {
      products.value = data.map((product) => ({
        ...product,
        isLowStock: product.quantity < lowStockThreshold, // Flag low stock
      }));
    } else {
      console.error("Error fetching products:", data.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to reset product form
const resetProductForm = () => {
  Object.assign(product, {
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    price: 0,
    supplier: "",
    status: "active",
  });
};

// Function to display all products

// Fetch products on component mount
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    console.log("User Role:", user.value.role); // Debugging log
  } else {
    console.log("No user found in localStorage.");
  }

  fetchProducts();
});

// Function to edit a product
const editProduct = (productToEdit) => {
  isEditMode.value = true;
  addNewProduct.value = true; // Open the modal
  product.value = { ...productToEdit }; // Copy product data for editing
};

// Function to update the product
const updateProduct = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/products/${product.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product.value),
      }
    );

    const data = await response.json();

    if (response.ok) {
      addNewProduct.value = false;
      resetProductForm();
      fetchProducts(); // Refresh product list
    } else {
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Function to delete a product from backend
const deleteProduct = async (productId) => {
  console.log("Attempting to delete product with ID:", productId); // Debugging log

  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
debugger
    if (response.ok) {
      products.value = products.value.filter(product => product.id !== productId);
    } else {
      const data = await response.json();
      console.error("Error deleting product:", data.message);
      toast.error("Failed to delete the product: " + data.message); // ✅ Show error as toast
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("An error occurred while deleting the product."); // ✅ Show server error
  }
};
</script>
