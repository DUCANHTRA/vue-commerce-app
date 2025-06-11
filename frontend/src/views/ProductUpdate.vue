<template>
  <!-- No changes to template section -->
</template>

<script>
import { toast } from '@/utils/toast'

export default {
  // No changes to component options
}
</script>

<style>
  /* No changes to style section */
</style>

<script>
export default {
  methods: {
    async updateProduct() {
      try {
        // Your existing update logic
        const response = await fetch(`/api/products/${this.productId}`, {
          method: 'PUT',
          body: JSON.stringify(this.product)
        });
        
        if (response.ok) {
          toast.success('Product updated successfully!')
          // Your existing success handling
        } else {
          toast.error('Failed to update product')
        }
      } catch (error) {
        toast.error('Error updating product: ' + error.message)
      }
    },

    async deleteProduct() {
      try {
        const response = await fetch(`/api/products/${this.productId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          toast.success('Product deleted successfully!')
          // Your existing success handling
        } else {
          toast.error('Failed to delete product')
        }
      } catch (error) {
        toast.error('Error deleting product: ' + error.message)
      }
    },

    validateForm() {
      if (!this.product.name) {
        toast.error('Product name is required')
        return false
      }
      if (this.product.price <= 0) {
        toast.error('Price must be greater than 0')
        return false
      }
      return true
    }
  }
}
</script> 