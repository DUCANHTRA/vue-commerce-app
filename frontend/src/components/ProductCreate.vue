<template>
  <div class="product-create">
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
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
              v-model="product.rating_rate"
              label="Rating"
              type="number"
              step="0.1"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="product.rating_count"
              label="Rating Count"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          color="success"
          class="mr-4"
          @click="createProduct"
          :disabled="!valid"
        >
          Create Product
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
import { toast } from '../utils/toast'

export default {
  name: 'ProductCreate',
  data() {
    return {
      valid: false,
      product: {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: { rate: 0, count: 0 }
      }
    }
  },
  methods: {
    async createProduct() {
      if (!this.$refs.form.validate()) return;

      try {
        const response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.product)
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to create product");
        }

        const newProduct = await response.json();

        console.log("Product creation response:", newProduct);

        // Backend returns: { success: true, id: '...' }
        if (newProduct && newProduct.id) {
          toast.success("Product created successfully!");
          this.$refs.form.reset();

          // likes are already initialized in backend, no extra request needed
          console.log("New product ID:", newProduct.id);
        } else {
          throw new Error("Failed to get new product ID");
        }

      } catch (error) {
        console.error("Error creating product:", error);
        toast.error(error.message || "Error creating product");
      }
    },

    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.product-create {
  padding: 20px;
}
</style> 