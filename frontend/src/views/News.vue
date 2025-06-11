<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h1>Latest News</h1>
      </div>
    </div>
    
    <!-- Search Section -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Search Filters</h5>
            <div class="row g-3">
              <!-- Title Search -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="titleSearch" class="form-label">Search by Title</label>
                  <input 
                    id="titleSearch"
                    v-model="searchFilters.title" 
                    class="form-control" 
                    placeholder="Enter title keywords..." 
                    @input="filterNews" 
                  />
                </div>
              </div>

              <!-- Content Search -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="contentSearch" class="form-label">Search by Content</label>
                  <input 
                    id="contentSearch"
                    v-model="searchFilters.content" 
                    class="form-control" 
                    placeholder="Enter content keywords..." 
                    @input="filterNews" 
                  />
                </div>
              </div>

              <!-- Date Search -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="dateSearch" class="form-label">Search by Date</label>
        <input 
                    id="dateSearch"
                    v-model="searchFilters.date" 
          class="form-control" 
                    placeholder="YYYY-MM-DD" 
          @input="filterNews" 
        />
      </div>
              </div>

              <!-- Category Filter -->
      <div class="col-12 col-md-6">
                <div class="form-group">
                  <label for="categoryFilter" class="form-label">Filter by Category</label>
        <select 
                    id="categoryFilter"
                    v-model="searchFilters.category" 
          class="form-select" 
          @change="filterNews"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
                </div>
              </div>

              <!-- Clear Filters Button -->
              <div class="col-12 text-end">
                <button 
                  class="btn btn-outline-secondary" 
                  @click="clearFilters"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News List -->
    <div class="row g-4">
      <div v-for="item in paginatedNews" :key="item.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title h4">{{ item.title }}</h2>
            <p class="text-muted small">{{ item.date }}</p>
            <span class="badge bg-secondary mb-2">{{ item.category }}</span>
            <p class="card-text">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-if="filteredNews.length === 0" class="row mt-4">
      <div class="col-12 text-center">
        <div class="alert alert-info">
          No news articles found matching your search criteria.
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="d-flex justify-content-center align-items-center">
          <v-btn
            variant="text"
            :disabled="currentPage === 1"
            @click="currentPage = 1"
            class="mx-1"
          >
            First
          </v-btn>
          <v-btn
            variant="text"
            :disabled="currentPage === 1"
                @click="currentPage--"
            class="mx-1"
              >
                Previous
          </v-btn>

          <!-- First Page -->
          <v-btn
            variant="text"
            :color="currentPage === 1 ? 'primary' : ''"
            @click="currentPage = 1"
            class="mx-1"
          >
            1
          </v-btn>

          <!-- Left Ellipsis -->
          <span v-if="currentPage > 3" class="mx-1">...</span>

          <!-- Middle Pages -->
          <template v-for="page in middlePages" :key="page">
            <v-btn
              variant="text"
              :color="currentPage === page ? 'primary' : ''"
              @click="currentPage = page"
              class="mx-1"
            >
              {{ page }}
            </v-btn>
          </template>

          <!-- Right Ellipsis -->
          <span v-if="currentPage < totalPages - 2" class="mx-1">...</span>

          <!-- Last Page -->
          <v-btn
            v-if="totalPages > 1"
            variant="text"
            :color="currentPage === totalPages ? 'primary' : ''"
            @click="currentPage = totalPages"
            class="mx-1"
          >
            {{ totalPages }}
          </v-btn>

          <v-btn
            variant="text"
            :disabled="currentPage === totalPages"
                @click="currentPage++"
            class="mx-1"
              >
                Next
          </v-btn>
          <v-btn
            variant="text"
            :disabled="currentPage === totalPages"
            @click="currentPage = totalPages"
            class="mx-1"
          >
            Last
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newsData from '../data/news.json'

export default {
  name: 'NewsView',
  data() {
    return {
      news: newsData.news,
      searchFilters: {
        title: '',
        content: '',
        date: '',
        category: ''
      },
      currentPage: 1,
      itemsPerPage: 6
    }
  },
  computed: {
    filteredNews() {
      return this.news.filter(item => {
        // Title search
        const matchesTitle = !this.searchFilters.title || 
          item.title.toLowerCase().includes(this.searchFilters.title.toLowerCase());
        
        // Content search
        const matchesContent = !this.searchFilters.content || 
          item.content.toLowerCase().includes(this.searchFilters.content.toLowerCase());
        
        // Date search
        const matchesDate = !this.searchFilters.date || 
          item.date.includes(this.searchFilters.date);
        
        // Category filter
        const matchesCategory = !this.searchFilters.category || 
          item.category === this.searchFilters.category;
        
        return matchesTitle && matchesContent && matchesDate && matchesCategory;
      });
    },
    categories() {
      return [...new Set(this.news.map(item => item.category))];
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end);
    },
    middlePages() {
      const pages = [];
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < this.totalPages) {
          pages.push(i);
        }
      }
      return pages;
    }
  },
  methods: {
    filterNews() {
      this.currentPage = 1;
    },
    clearFilters() {
      this.searchFilters = {
        title: '',
        content: '',
        date: '',
        category: ''
      };
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .form-group {
    margin-bottom: 0;
  }
}
</style> 