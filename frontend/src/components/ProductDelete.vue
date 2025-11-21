<template>
  <div class="product-delete">
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="productId"
              label="Product ID"
              type="number"
              required
              @change="fetchProduct"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="product">
            <v-card class="mx-auto" max-width="400">
              <v-card-title>{{ product.title }}</v-card-title>
              <v-card-text>
                <p><strong>Price:</strong> ${{ product.price }}</p>
                <p><strong>Category:</strong> {{ product.category }}</p>
                <p><strong>Rating:</strong> {{ product.rating_rate }} ({{ product.rating_count }} reviews)</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-btn
          color="error"
          class="mr-4"
          @click="deleteProduct"
          :disabled="!valid || !productId || !product"
        >
          Delete Product
        </v-btn>

        <v-btn color="grey" class="mr-4" @click="reset">
          Reset
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { toast } from '../utils/toast'

export default {
  name: 'ProductDelete',
  data() {
    return {
      valid: false,
      productId: '',
      product: null
    }
  },
  methods: {
    async fetchProduct() {
      if (!this.productId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/products/${this.productId}`);

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || `Server error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data._id) {
          toast.error("Product not found.");
          this.reset();
          return;
        }

        // Assign product object to local state
        this.product = data;
        console.log("Fetched product:", data);

      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product.");
        this.reset();
      }
    },
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

        if (!response.ok || !data.success) {
          throw new Error(data.message || `Deletion failed with status ${response.status}`);
        }

        // Success
        toast.success("Product deleted successfully.");
        this.reset();

      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product.");
      }
    },
    reset() {
      this.productId = '';
      this.product = null;
      this.$refs.form.reset();
    }
  }
}
</script>

<style scoped>
.product-delete {
  padding: 20px;
}
</style>
