<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title class="d-flex flex-column flex-sm-row align-center">
            <h2 class="mb-4 mb-sm-0">Products</h2>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="search-field"
              @input="handleSearch"
            ></v-text-field>
          </v-card-title>

          <v-card-text>
            <!-- Loading State -->
            <div v-if="loading" class="d-flex justify-center align-center py-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-4">
              <v-alert type="error" class="mx-auto" max-width="500">
                {{ error }}
              </v-alert>
            </div>

            <!-- No Results State -->
            <div v-else-if="filteredProducts.length === 0" class="text-center py-4">
              <v-alert type="info" class="mx-auto" max-width="500">
                No products found matching your search criteria.
              </v-alert>
            </div>

            <!-- Products Grid -->
            <template v-else>
              <v-row>
                <v-col 
                  v-for="product in paginatedProducts" 
                  :key="product.id" 
                  cols="12" 
                  sm="6" 
                  md="4" 
                  lg="3"
                >
                  <v-card class="h-100">
                    <v-img
                      :src="product.image"
                      height="200"
                      contain
                      class="bg-grey-lighten-2"
                    ></v-img>
                    <v-card-title class="text-truncate">{{ product.title }}</v-card-title>
                    <v-card-text>
                      <div class="text-subtitle-1 font-weight-bold">${{ product.price }}</div>
                      <div class="text-caption text-truncate">{{ product.description }}</div>
                      <div class="text-caption">Category: {{ product.category }}</div>
                      <div class="text-caption">Rating: {{ product.rating_rate }} ({{ product.rating_count }} reviews)</div>
                      <div class="text-caption text-grey">ID: {{ product._id }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Pagination -->
              <div class="d-flex justify-center mt-4">
                <v-pagination
                  v-model="currentPage"
                  :length="totalPages"
                  :total-visible="7"
                  rounded
                  color="primary"
                  @update:model-value="handlePageChange"
                ></v-pagination>
              </div>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      filteredProducts: [],
      search: '',
      error: null,
      loading: false,
      currentPage: 1,
      itemsPerPage: 12,
      searchTimeout: null
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    }
  },
  methods: {
    handleSearch() {
      // Filter products locally based on title
      if (this.search.trim() === '') {
        this.filteredProducts = this.products;
      } else {
        const searchTerm = this.search.toLowerCase();
        this.filteredProducts = this.products.filter(product => 
          product.title.toLowerCase().includes(searchTerm)
        );
      }
      this.currentPage = 1; // Reset to first page when search changes
    },
    handlePageChange(page) {
      this.currentPage = page;
      // Scroll to top of the product list
      window.scrollTo({
        top: this.$el.offsetTop - 100,
        behavior: 'smooth'
      });
    },

    //fetch products
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        //const url = "http://localhost:5000/api/products"; 
        
        // Fetch all products
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Network response was not ok");
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          this.products = result.data;
          this.filteredProducts = result.data;
          this.currentPage = 1;
          console.log("Fetched products:", result.data);
        } else {
          throw new Error("Invalid response format from server");
        }


      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = "Failed to load products. Please try again later.";
        this.products = [];
        this.filteredProducts = [];
      } finally {
        this.loading = false;
      }
    },

    //Why is this function here ?
    async deleteProduct() {
      if (!this.$refs.form.validate() || !this.productId) return;

      if (!confirm("Are you sure you want to delete this product?")) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${this.productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const data = await response.json();

        if (data.success) {
          alert("Product deleted successfully!");
          this.reset();
        } else {
          throw new Error(data.message || "Failed to delete product");
        }

      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product: " + error.message);
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>

<style scoped>
.search-field {
  max-width: 300px;
}

/* Mobile-first responsive styles */
.v-card {
  margin-bottom: 16px;
}

/* Tablet breakpoint (768px and up) */
@media (min-width: 768px) {
  .v-card {
    margin-bottom: 24px;
  }
}

/* Desktop breakpoint (1024px and up) */
@media (min-width: 1024px) {
  .v-card {
    margin-bottom: 32px;
  }
}
</style> 