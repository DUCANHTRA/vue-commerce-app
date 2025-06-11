<script>
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
        let response = await fetch("/cos30043/s104204233/A3_v1/resource/api3.php?categories=true");
        let data = await response.json();
        console.log('Received categories:', data);
        if (data.success && data.data) {
          this.categories = data.data;
        } else {
          console.error('No categories data received');
          this.categories = [];
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
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
    <div v-for="category in categories" :key="category.category">
      <ProductsCategory :category="category.category" show-more-btn />
    </div>

  </main>
</template>
