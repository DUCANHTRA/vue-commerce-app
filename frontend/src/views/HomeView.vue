<script>
import { API_BASE_URL } from "../config";
import ProductsCategory from "../components/ProductsCategory.vue";

export default {
  name: "HomeView",
  components: {
    ProductsCategory,
  },
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        let response = await fetch(`${API_BASE_URL}/api/products`);
        let data = await response.json();
        console.log('Received products:', data);

        if (data.success && data.data) {
          // Extract unique categories
          const uniqueCategories = [...new Set(data.data.map(p => p.category))];
          this.categories = uniqueCategories;
        } else {
          console.error('No product data received');
          this.categories = [];
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        this.categories = [];
      }
    }
  },
};
</script>

<template>
  <main class="container">
    <h1 class="my-4 text-center display-4 fw-bold">Shop</h1>

    <!--v pass and render category-->
    <div v-for="category in categories" :key="category">
      <ProductsCategory :category="category" show-more-btn />
    </div>


  </main>
</template>
