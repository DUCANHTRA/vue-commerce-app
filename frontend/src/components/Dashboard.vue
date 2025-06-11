<template>
  <div id="dashboard">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">
          Dashboard
        </h1>
      </v-card-title>
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <ProductList v-if="tab === 0" />
              <ProductCreate v-if="tab === 1" />
              <ProductUpdate v-if="tab === 2" />
              <ProductDelete v-if="tab === 3" />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProductList from './ProductList.vue'
import ProductCreate from './ProductCreate.vue'
import ProductUpdate from './ProductUpdate.vue'
import ProductDelete from './ProductDelete.vue'

export default {
  name: 'Dashboard',
  components: {
    ProductList,
    ProductCreate,
    ProductUpdate,
    ProductDelete
  },
  data() {
    return {
      tab: null,
      items: [
        'View',
        'Insert',
        'Update',
        'Delete'
      ]
    }
  },
  created() {
    // Check if user is authenticated
    if (!localStorage.getItem('isAuthenticated')) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.basil--text {
  color: #356859 !important;
}
</style> 