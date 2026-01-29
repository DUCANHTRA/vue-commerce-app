<template>

</template>

<script>
import { toast } from '@/utils/toast'

export default {

}
</script>

<style>

</style>

<script>
export default {
  methods: {
    async updateProduct() {
      try {
        const response = await fetch(`/api/products/${this.productId}`, {
          method: 'PUT',
          body: JSON.stringify(this.product)
        });
        
        if (response.ok) {
          toast.success('Product updated successfully!')
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