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
    fetchProduct() {
      if (!this.productId) return;
      // '/cos30043/s104204233/A3_v1/resource/api1.php/id/${this.productId}

      fetch(`/cos30043/s104204233/A3_v1/resource/api1.php/id/${this.productId}`)
        .then(async response => {
          const text = await response.text();
          let data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('Raw server response:', text);
            throw new Error(`Invalid response format from server: ${e.message}`);
          }

          if (!response.ok) {
            throw new Error(data.message || `Server error: ${response.status}`);
          }

          if (!Array.isArray(data)) {
            throw new Error('Expected array response from server');
          }

          return data;
        })
        .then(data => {
          if (data && data.length > 0) {
            this.product = data[0];
          } else {
            //toast implementation
            toast.error('Product not found.');
            
            this.reset();
          }
        })
        .catch(error => {
          console.error('Error details:', error);
          //toast implementation
          toast.error('Error fetching product.');
          
        });
    },
    deleteProduct() {
      if (!this.$refs.form.validate() || !this.productId) return;

      if (confirm('Are you sure you want to delete this product?')) {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.productId
          })
        };

        fetch(`/cos30043/s104204233/A3_v1/resource/api1.php/id/${this.productId}`, requestOptions)
          .then(async response => {
            const text = await response.text();
            let data;
            try {
              data = JSON.parse(text);
            } catch (e) {
              console.error('Raw server response:', text);
              throw new Error(`Invalid response format from server: ${e.message}`);
            }

            if (!response.ok) {
              throw new Error(data.message || `Server error: ${response.status}`);
            }

            return data;
          })
          .then(data => {
            if (data.success) {
              //toast implementation
              toast.success('Product deleted successfully.');
              
              
              this.reset();
            } else {
              throw new Error(data.message || 'Deletion failed.');
            }
          })
          .catch(error => {
            console.error('Error details:', error);
            //toast implementation
            toast.error('Error deleting product.');
            
          });
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
