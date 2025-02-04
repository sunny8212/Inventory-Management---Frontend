<template>
  <div class="p-6 flex flex-col items-center bg-zinc-400 min-h-screen">
    <h2 class="text-4xl font-bold mb-4 text-center text-indigo-700">
      {{ user?.role }} Dashboard
    </h2>
    <p class="text-lg text-gray-800">Welcome, {{ user?.name || "Guest" }}!</p>
    <span v-if="user?.role" class="text-sm text-gray-700">Role: {{ user?.role }}</span>
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
      class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6"
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
      class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6"
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
      class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-gray-00 mb-4">Client Section</h3>
      <div
        v-if="products.some((p) => p.isLowStock)"
        class="bg-yellow-200 border-l-4 text-yellow-800 px-4 py-3 rounded-lg m-4"
      >
        ⚠️ Warning: <strong>{{ lowStockCount }}</strong> products have low
        stock!
      </div>

      <div
        v-if="totalInventoryValue > 0"
        class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded-lg m-4"
      >
        🏷️ <strong>Total Inventory Value:</strong> ₹
        {{ totalInventoryValue.toFixed(2) }}
      </div>
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
        <button
          @click="exportToCSV"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 mt-4 ml-[33rem]"
        >
          📥 Export Report as CSV
        </button>
      </div>
      <div class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 class="text-2xl font-semibold text-indigo-700 mb-4">
          Stock Levels by Category
        </h3>

        <Bar v-if="chartData" :data="chartData" :options="chartOptions" />

        <p v-else class="text-gray-500">Loading data...</p>
      </div>
    </div>

    <div
      v-if="addNewProduct"
      class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">
        Enter Product details
      </h3>
      <form @submit.prevent="handleNewProductSubmit()" class="space-y-4">
        <h2 class="text-xl font-bold">Add Product</h2>

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
            required
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
            required
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
          Add Product
        </button>
      </form>
    </div>
    <!-- 📌 Product-Wise Monthly Stock Updates -->
    <div 
    v-if="user?.role === 'Viewer'"
    class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">
        Product-Wise Monthly Stock Updates
        <button
          @click="exportToCSV"
          class="bg-blue-600 text-white py-2 px-4 text-sm rounded-lg shadow-md hover:bg-blue-800 mt-4 ml-[30rem]"
        >
          📥 Export Report as CSV
        </button>
      </h3>
      <!-- 📌 Export Button for Product-Wise Monthly Stock Report -->
      

      <!-- 📌 Table for Product-Wise Monthly Data -->
      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">Product</th>
            <th class="border border-gray-300 px-4 py-2">Month</th>
            <th class="border border-gray-300 px-4 py-2">Restocked</th>
            <th class="border border-gray-300 px-4 py-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(update, index) in productStockUpdates" :key="index">
            <td class="border border-gray-300 px-4 py-2">
              {{ update.product }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ update.month }}</td>
            <td
              class="border border-gray-300 px-4 py-2 text-green-600 font-bold"
            >
              {{ update.restocked }}
            </td>
            <td class="border border-gray-300 px-4 py-2 text-red-600 font-bold">
              {{ update.sold }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 📌 Chart for Product-Wise Monthly Data -->
      <Bar
        v-if="productStockChartData"
        :data="productStockChartData"
        :options="chartOptionsss"
      />
    </div>

    <!-- Edit Product Modal -->
    <div
      v-if="selectedProduct"
      class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-indigo-700 mb-4">Edit Product</h3>
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
        <form @submit.prevent="handleEditProductSubmit()" class="space-y-4">
        <div>
          <label for="editName" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="selectedProduct.name"
            type="text"
            id="editName"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            for="editQuantity"
            class="block text-sm font-medium text-gray-700"
            >Quantity</label
          >
          <input
            v-model.number="selectedProduct.quantity"
            type="number"
            id="editQuantity"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label for="editPrice" class="block text-sm font-medium text-gray-700"
            >Price</label
          >
          <input
            v-model.number="selectedProduct.price"
            type="number"
            id="editPrice"
            step="0.01"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            for="editSupplier"
            class="block text-sm font-medium text-gray-700"
            >Supplier</label
          >
          <input
            v-model="selectedProduct.supplier"
            type="text"
            id="editSupplier"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Restock Quantity Field -->
        <div>
          <label for="restock" class="block text-sm font-medium text-gray-700"
            >Restock Quantity</label
          >
          <input
            v-model.number="selectedProduct.restocked"
            type="number"
            id="restock"
            placeholder="Enter Restock Quantity"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Sold Quantity Field -->
        <div>
          <label for="sold" class="block text-sm font-medium text-gray-700"
            >Sold Quantity</label
          >
          <input
            v-model.number="selectedProduct.sold"
            type="number"
            id="sold"
            placeholder="Enter Sold Quantity"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            for="editStatus"
            class="block text-sm font-medium text-gray-700"
            >Status</label
          >
          <select
            v-model="selectedProduct.status"
            id="editStatus"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800"
          >
            Save Changes
          </button>
          <button
            type="button"
            @click="selectedProduct = null"
            class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>

    <div
      v-if="showAllProduct"
      class="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-6"
    >
      <h3 class="text-2xl font-semibold text-indigo-700">All Products</h3>
      <table class="min-w-full divide-y divide-gray-200 mr-4">
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
              ₹ {{ product.price.toFixed(2) }}
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
              <button
                @click="deleteProduct(product._id || product.id)"
                class="text-red-600 hover:text-red-900"
              >
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

const user = ref(null); // Access global user state
const showModal = ref(false); // To control the visibility of the modal
const newResource = ref({ name: "" }); // New resource object
const showReports = ref(false); // To toggle the visibility of the reports table
const addNewProduct = ref(false); // To add new product form visibility
const showAllProduct = ref(false); // To view all products
const products = ref([]); // Store the list of products
const lowStockThreshold = 5; // Set stock threshold
const selectedProduct = ref(null); // Store the product being edited

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
      alert("Product added successfully!");
      addNewProduct.value = false; // Close form modal
      resetProductForm();
      fetchProducts(); // Refresh product list
    } else {
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Function to fetch all products with lowstock count
const lowStockCount = ref(0); // New state for low stock items count
const totalInventoryValue = ref(0); // New state for inventory value

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/products");
    const data = await response.json();

    if (response.ok) {
      products.value = data.map((product) => ({
        ...product,
        isLowStock: product.quantity < lowStockThreshold, // Flag low stock
      }));

      // ✅ Calculate the number of products that are low stock
      lowStockCount.value = products.value.filter((p) => p.isLowStock).length;

      // ✅ Calculate total inventory value
      totalInventoryValue.value = products.value.reduce((sum, product) => {
        return sum + product.price * product.quantity;
      }, 0);
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

// Function to delete a product from backend
const deleteProduct = async (productId) => {
  console.log("Attempting to delete product with ID:", productId); // Debugging log

  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(
      `http://localhost:8000/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    debugger;
    if (response.ok) {
      products.value = products.value.filter(
        (product) => product.id !== productId
      );
    } else {
      const data = await response.json();
      console.error("Error deleting product:", data.message);
      alert("Failed to delete the product: " + data.message);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("An error occurred while deleting the product.");
  }
};

// Function to open edit modal with selected product
const editProduct = (product) => {
  selectedProduct.value = { ...product };
  selectedProduct.value.id = product.id || product._id; // Ensure the correct ID is used
  selectedProduct.value.restocked = 0; // Reset restocked field
  selectedProduct.value.sold = 0; // Reset sold field
};

// Function to submit edited product
const handleEditProductSubmit = async () => {
  if (!selectedProduct.value) return;

  try {
    // Ensure that restocked and sold values are correctly parsed as numbers
    const restockedAmount = Number(selectedProduct.value.restocked) || 0;
    const soldAmount = Number(selectedProduct.value.sold) || 0;

    // Fetch the existing product data from the backend
    const response = await fetch(
      `http://localhost:8000/api/products/${selectedProduct.value.id}`
    );

    if (!response.ok) {
      alert("Failed to fetch product data from backend.");
      return;
    }

    const existingProduct = await response.json();

    // Calculate new quantity correctly
    const newQuantity = existingProduct.quantity + restockedAmount - soldAmount;
    if (newQuantity < 0) {
      alert("Error: Quantity cannot be negative!");
      return;
    }

    // Prepare updated product data
    const updatedProduct = {
      ...existingProduct,
      name: selectedProduct.value.name,
      sku: selectedProduct.value.sku,
      category: selectedProduct.value.category,
      quantity: newQuantity,
      price: selectedProduct.value.price,
      supplier: selectedProduct.value.supplier,
      status: selectedProduct.value.status,
      restocked: existingProduct.restocked + restockedAmount,
      sold: existingProduct.sold + soldAmount,
    };

    // Send PUT request to update product
    const updateResponse = await fetch(
      `http://localhost:8000/api/product/${selectedProduct.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );

    const data = await updateResponse.json();

    if (updateResponse.ok) {
      // Update the product in the frontend list immediately
      const index = products.value.findIndex(
        (p) => p.id === selectedProduct.value.id
      );
      if (index !== -1) {
        products.value[index] = { ...updatedProduct };
      }

      selectedProduct.value = null; // Close modal
      alert("Product updated successfully!");
      fetchProducts(); // Refresh product list
    } else {
      alert("Failed to update product: " + data.message);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    alert("An error occurred while updating the product.");
  }
};

const componentKey = ref(0); // This key will force the component to reload

// Watch for changes in selectedProduct and force re-render
watch(selectedProduct, () => {
  componentKey.value += 1; // Updating the key will force the component to reload
});

// Function to close the edit modal
const closeEditModal = () => {
  selectedProduct.value = null;
};

//For category chart
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(...registerables);

const stockByCategory = ref([]);

const fetchStockByCategory = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/stock-by-category");
    const data = await response.json();
    stockByCategory.value = data;
  } catch (error) {
    console.error("Error fetching stock levels:", error);
  }
};

// Fetch stock data when component loads
onMounted(fetchStockByCategory);

const chartData = computed(() => ({
  labels: stockByCategory.value.map((item) => item._id),
  datasets: [
    {
      label: "Stock Levels",
      backgroundColor: ["#4F46E5", "#22C55E", "#F97316", "#EF4444"],
      data: stockByCategory.value.map((item) => item.totalStock),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

// Export products to CSV
const exportToCSV = () => {
  if (products.value.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Define CSV headers
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Name,SKU,Category,Quantity,Price,Supplier,Status\n";

  // Append product data
  products.value.forEach((product) => {
    const row = [
      `"${product.name}"`,
      `"${product.sku}"`,
      `"${product.category}"`,
      product.quantity,
      product.price.toFixed(2),
      `"${product.supplier}"`,
      `"${product.status}"`,
    ].join(",");

    csvContent += row + "\n";
  });

  // Create a download link and trigger it
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `inventory_report_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("CSV report downloaded successfully!");
};

const productStockChartData = computed(() => ({
  labels: [...new Set(productStockUpdates.value.map((item) => item.month))], // Get unique months
  datasets: productStockUpdates.value.reduce((acc, item) => {
    let existingProduct = acc.find((dataset) => dataset.label === item.product);

    if (!existingProduct) {
      acc.push({
        label: item.product,
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16), // Random colors
        data: [],
      });
      existingProduct = acc[acc.length - 1];
    }

    existingProduct.data.push(item.restocked - item.sold); // Net stock change
    return acc;
  }, []),
}));

const chartOptionsss = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
};

const productStockUpdates = ref([]);

const fetchProductStockUpdates = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/product-monthly-stock-updates"
    );
    const data = await response.json();

    if (response.ok) {
      productStockUpdates.value = data;
    } else {
      console.error(
        "Error fetching product-wise monthly stock updates:",
        data.error
      );
    }
  } catch (error) {
    console.error("Error fetching product stock updates:", error);
  }
};

// 📌 Fetch data when component is mounted
onMounted(fetchProductStockUpdates);

const exportProductStockCSV = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/export-product-monthly-stock"
    );

    if (!response.ok) {
      throw new Error("Failed to download CSV");
    }

    // Convert response to blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create download link and trigger click
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "product_monthly_stock.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("CSV report downloaded successfully!");
  } catch (error) {
    console.error("Error exporting CSV:", error);
    alert("Failed to export CSV file.");
  }
};
</script>
