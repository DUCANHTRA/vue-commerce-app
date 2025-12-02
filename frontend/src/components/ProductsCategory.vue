<template>
  <div class="mb-5">
    
    <div class="p-3 bg-primary text-white mb-4">
      <h3 class="h2 text-center text-uppercase fw-semibold">
        {{ category }}
      </h3>
    </div>

    <div v-if="!isLoading">

      <div v-if="error" class="alert alert-danger text-center" role="alert">
        {{ error }}
      </div>

      <div v-else-if="products.length === 0" class="alert alert-info text-center" role="alert">
        No products found in this category.
      </div>

      <div v-else class="container">
        <!-- Search and Filter Component -->
        <SearchFilter @search="handleSearch" />

        <!-- Responsive grid with different columns for different screen sizes -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div v-for="product in paginatedProducts" :key="product.id" class="col">
            <ProductCard :product="product" />
          </div>
        </div>
        
        <!-- Pagination controls -->
        <div class="d-flex justify-content-center mt-4">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            rounded
            color="primary"
            @update:model-value="handlePageChange"
          ></v-pagination>
        </div>
      </div>

      <RouterLink
        v-if="showMoreBtn && products.length > 0"
        :to="link"
        class="btn btn-outline-primary text-uppercase mt-4 position-relative start-50 translate-middle-x"
      >
        Show More
      </RouterLink>

    </div>
    
    <div v-else class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";
import { RouterLink } from "vue-router";
import ProductCard from "./ProductCard.vue";
import SearchFilter from "./SearchFilter.vue";

export default {
  name: "ProductsCategory",
  components: {
    ProductCard,
    RouterLink,
    SearchFilter,
  },
  props: {
    category: String,
    showMoreBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    //Data of ProductCategory.vue
    return {
      link: "",
      products: [],
      filteredProducts: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 8,
      searchFilters: {
        query: '',
        priceRange: [0, 1000],
        sortBy: 'default'
      }
    };
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
    handleSearch(filters) {
      this.searchFilters = filters;
      this.filterProducts();
      this.currentPage = 1; // Reset to first page when filters change
    },
    filterProducts() {
      let filtered = [...this.products];

      // Apply search query filter
      //Filter by name
      if (this.searchFilters.query) {
        const query = this.searchFilters.query.toLowerCase();
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query)
        );
      }

      // Apply price range filter
      filtered = filtered.filter(product => 
        product.price >= this.searchFilters.priceRange[0] &&
        product.price <= this.searchFilters.priceRange[1]
      );

      // Apply sorting
      switch (this.searchFilters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name_asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name_desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          // Keep original order
          break;
      }

      this.filteredProducts = filtered;
    },
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo({
        top: this.$el.offsetTop - 100,
        behavior: 'smooth'
      });
    },

    //Get products from API
    async getProducts() {
        try {
            this.error = null;
            let url = `${API_BASE_URL}/api/products?category=${encodeURIComponent(this.category)}`;
            console.log('Attempting to fetch from URL:', url);

            if (this.showMoreBtn) {
                url += `&limit=4`;
            }

            this.isLoading = true;
            let response = await fetch(url);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            let result = await response.json();
            console.log('API Response:', result);

            if (result.success) {
                this.products = result.data || [];
                this.filteredProducts = [...this.products];
                if (this.products.length === 0) {
                    this.error = result.message || 'No products found in this category';
                }
            } else {
                throw new Error(result.message || 'Failed to fetch products');
            }
        } catch (error) {
            console.error("Detailed error:", error);
            this.error = `Error loading products: ${error.message}`;
            this.products = [];
            this.filteredProducts = [];
        } finally {
            this.isLoading = false;
        }
    }
  },
  created() {
    //Link = category${this.category}
    this.link = `/category/${this.category}`;
    this.getProducts();
  },
};
</script>

<style scoped>
/* Mobile-first responsive styles */
.row {
margin: 0 -8px;
}

.col {
padding: 8px;
}

/* Tablet breakpoint (768px and up) */
@media (min-width: 768px) {
.row {
  margin: 0 -12px;
}

.col {
  padding: 12px;
}
}

/* Desktop breakpoint (1024px and up) */
@media (min-width: 1024px) {
.row {
  margin: 0 -16px;
}

.col {
  padding: 16px;
}
}
</style>
