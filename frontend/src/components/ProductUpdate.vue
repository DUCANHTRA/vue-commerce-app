<template>
  <div class="product-update">
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="productId"
              label="Product ID"
              type="text"
              required
              @change="fetchProduct"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.title"
              label="Title"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.price"
              label="Price"
              type="number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="product.description"
              label="Description"
              required
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.category"
              label="Category"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.image"
              label="Image URL"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.rating.rate"
              label="Rating"
              type="number"
              step="0.1"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.rating.count"
              label="Rating Count"
              type="number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.stock"
              label="Stock"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          class="mr-4"
          @click="updateProduct"
          :disabled="!valid || !productId"
        >
          Update Product
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { API_BASE_URL } from '../config';
import { toast } from '../utils/toast'

export default {
  name: 'ProductUpdate',
  //Data
  data() {
    return {
      valid: false,
      productId: '',
      product: {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: { rate: 0, count: 0 },
      stock: 0
      }
    }
  },

  //Method
  methods: {
    async fetchProduct() {
      if (!this.productId) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${this.productId}`);

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
    async updateProduct() {
      if (!this.$refs.form.validate() || !this.productId) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/${this.productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.product)
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to update product");
        }

        toast.success("Product updated successfully.");
        console.log("Updated product:", data.product);

      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Error updating product.");
      }
    },
    reset() {
      this.productId = '';
      this.$refs.form.reset();
    }
  }
}
</script>

<style scoped>
.product-update {
  padding: 20px;
}
</style> 