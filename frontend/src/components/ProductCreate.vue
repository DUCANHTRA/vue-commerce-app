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
    createProduct() {
      if (this.$refs.form.validate()) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.product)
        }

        fetch('/cos30043/s104204233/A3_v1/resource/api1.php', requestOptions)
          .then(response => response.text())
          .then(data => {
            console.log('Product creation response:', data);
            // Parse the response to get the new product ID
            const newProduct = JSON.parse(data);
            if (newProduct && newProduct.id) {
              console.log('New product created with ID:', newProduct.id);``
              // Create likes entry for the new product
              const likesRequestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product_id: newProduct.id })
              };

              return fetch('/cos30043/s104204233/A3_v1/resource/api_likes.php', likesRequestOptions)
                .then(response => response.json())
                .then(likesData => {

                  //Added console logging for respone
                  console.log('Likes initialization response:', likesData);

                  if (likesData.success) {
                    this.$refs.form.reset();
                    toast.success('Product created successfully!');
                  } else {
                    throw new Error(likesData.message || 'Failed to initialize likes');
                  }
                });
            } else {
              throw new Error('Failed to get new product ID');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            toast.error(error.message || 'Error creating product');
          });
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