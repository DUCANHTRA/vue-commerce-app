<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h1>Welcome to Our E-Commerce Store</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-8 offset-md-2 text-center mb-5">
        <p class="lead">
          Discover a world of amazing products at unbeatable prices. Our e-commerce platform offers 
          a wide range of high-quality items, from electronics to fashion, all in one convenient place. 
          Shop with confidence and enjoy our fast delivery and excellent customer service.
        </p>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-md-6">
        <div class="card h-100 shadow-sm">
          <img src="/images/features1.jpg" class="card-img-top" alt="Featured Products" style="height: 300px; object-fit: cover;" />
          <div class="card-body">
            <h3 class="card-title">Featured Products</h3>
            <p class="card-text">Explore our handpicked selection of trending items and bestsellers.</p>
          </div>
        </div>
      </div>
      
      <div class="col-12 col-md-6">
        <div class="card h-100 shadow-sm">
          <img src="/images/features2.jpg" class="card-img-top" alt="Special Offers" style="height: 300px; object-fit: cover;" />
          <div class="card-body">
            <h3 class="card-title">Special Offers</h3>
            <p class="card-text">Take advantage of our exclusive deals and limited-time promotions.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style> 