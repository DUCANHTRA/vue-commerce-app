<template>
  <div class="search-filter-container mb-4">
    <v-card class="pa-4">
      <!-- Search Bar -->
      <v-text-field
        v-model="searchQuery"
        label="Search products"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        hide-details
        class="mb-4"


        
        
        @update:model-value="handleFilter"
      ></v-text-field>

      <!-- Filters -->
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            Filters
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <!-- Price Range Filter -->
            <div class="mb-4">
              <h4 class="text-subtitle-1 mb-2">Price Range</h4>
              <v-range-slider
                v-model="priceRange"
                :min="0"
                :max="1000"
                :step="10"
                thumb-label
                @update:model-value="handleFilter"
              ></v-range-slider>
              <div class="d-flex justify-space-between">
                <span>${{ priceRange[0] }}</span>
                <span>${{ priceRange[1] }}</span>
              </div>
            </div>

            <!-- Sort Options -->
            <div class="mb-4">
              <h4 class="text-subtitle-1 mb-2">Sort By</h4>
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                variant="outlined"
                density="comfortable"
                hide-details
                @update:model-value="handleFilter"
              ></v-select>
            </div>

            <!-- Clear Filters Button -->
            <v-btn
              color="primary"
              variant="outlined"
              block
              @click="clearFilters"
            >
              Clear Filters
            </v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  data() {
    return {
      searchQuery: '',
      priceRange: [0, 1000],
      sortBy: 'default',
      sortOptions: [
        { title: 'Default', value: 'default' },
        { title: 'Price: Low to High', value: 'price_asc' },
        { title: 'Price: High to Low', value: 'price_desc' },
        { title: 'Name: A to Z', value: 'name_asc' },
        { title: 'Name: Z to A', value: 'name_desc' }
      ]
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', {
        query: this.searchQuery,
        priceRange: this.priceRange,
        sortBy: this.sortBy
      });
    },
    handleFilter() {
      this.handleSearch();
    },
    clearFilters() {
      this.searchQuery = '';
      this.priceRange = [0, 1000];
      this.sortBy = 'default';
      this.handleSearch();
    }
  }
}
</script>

<style scoped>
.search-filter-container {
  width: 100%;
}

/* Mobile-first responsive styles */
.v-card {
  margin: 0 8px;
}

/* Tablet breakpoint (768px and up) */
@media (min-width: 768px) {
  .v-card {
    margin: 0 16px;
  }
}

/* Desktop breakpoint (1024px and up) */
@media (min-width: 1024px) {
  .v-card {
    margin: 0 24px;
  }
}
</style> 