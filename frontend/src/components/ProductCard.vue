<template>
    <div class="position-relative d-flex flex-column h-100 bg-white rounded shadow-sm">

      <div class="d-flex justify-content-center pt-2">
        <img :src="product.image" :alt="product.title" class="img-fluid" style="height: 160px; object-fit: contain;" />
      </div>

      <p class="description mt-4 mb-1 px-4 text-center">
        {{ product.title }}
      </p>
      <p class="mb-2 text-center h3">${{ product.price }}</p>
      <div class="d-flex justify-content-center align-items-center mb-4">
        <button
          @click="handleLike"
          class="btn btn-outline-primary btn-sm me-2"
          :class="{ 'active': isLiked }"
        >
          <i class="bi bi-heart-fill"></i> {{ likesCount }}
        </button>
        <button
          @click="cartStore.addToCart(product)"
          class="btn btn-primary text-uppercase"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from "../stores/cart";
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    //prop: Product Object
    product: Object,
  });
  
  //Use Pinia Store
  const cartStore = useCartStore();
  const likesCount = ref(0);
  const isLiked = ref(false);
  
  const fetchLikes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${props.product._id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        likesCount.value = data[0].likes_count;
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };
  
  const handleLike = async () => {
    try {
      const response = await fetch(
      `http://localhost:5000/api/products/${props.product._id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      if (data && data.likes_count !== undefined) {
        likesCount.value = data.likes_count;
        isLiked.value = true;
        // Optional: Add success feedback
        
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error liking product:', error);
      alert('Error liking product. Please try again.');
    }
  };
  
  onMounted(() => {
    fetchLikes();
  });
  </script>
  
  <style scoped>
  .btn-outline-primary.active {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
  }
  </style>
  