<template>
  <div class="product-update">
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
import { toast } from '../utils/toast'

export default {
  name: 'ProductUpdate',
  data() {
    return {
      valid: false,
      productId: '',
      product: {
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating_rate: '',
        rating_count: ''
      }
    }
  },
  methods: {
    fetchProduct() {
      if (this.productId) {
        fetch(`/cos30043/s104204233/A3_v1/resource/api1.php/id/${this.productId}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.length > 0) {
              this.product = data[0]
            } else {
              //toast implementation
              toast.error('Product not found.');
              
              this.reset();
            }
          })
          .catch(error => {
            console.error('Error:', error);
            //toast implementation
            toast.error('Error fetching product.');
            
          })
      }
    },
    updateProduct() {
      if (this.$refs.form.validate() && this.productId) {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.product)
        }

        fetch(`/cos30043/s104204233/A3_v1/resource/api1.php/id/${this.productId}`, requestOptions)
          .then(response => response.text())
          .then(data => {
            //toast implementation
            toast.success('Product updated successfully.');

            
          })
          .catch(error => {
            console.error('Error:', error);
            //toast implementation
            toast.error('Error updating product.');
            
          })
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