<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h1>About Our E-Commerce Store</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <p class="lead">
              Welcome to our premier e-commerce destination! We are committed to providing you with an 
              exceptional shopping experience, offering a vast selection of high-quality products at 
              competitive prices. Our platform combines convenience, security, and excellent customer 
              service to make your shopping journey enjoyable and hassle-free.
            </p>
          </div>
        </div>

        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title h4 mb-4">Personalize Your Shopping Experience</h2>
            
            <div class="row g-3 mb-4">
              <div class="col-12 col-md-6">
                <input 
                  v-model="firstName" 
                  class="form-control"
                  placeholder="First Name"
                  @input="updateWelcomeMessage"
                />
              </div>
              <div class="col-12 col-md-6">
                <input 
                  v-model="lastName" 
                  class="form-control"
                  placeholder="Last Name"
                  @input="updateWelcomeMessage"
                />
              </div>
            </div>
            
            <div v-if="welcomeMessage" class="alert alert-info mb-4">
              {{ welcomeMessage }}
            </div>

            <div class="mb-4">
              <h3 class="h5 mb-3">Choose Your Shopping Style</h3>
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <div class="form-check">
                    <input 
                      type="radio" 
                      class="form-check-input"
                      v-model="selectedImage" 
                      value="mountain"
                      id="premium"
                    />
                    <label class="form-check-label" for="premium">
                      Premium Collection
                    </label>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-check">
                    <input 
                      type="radio" 
                      class="form-check-input"
                      v-model="selectedImage" 
                      value="ocean"
                      id="budget"
                    />
                    <label class="form-check-label" for="budget">
                      Budget Friendly
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <img 
                :src="selectedImage === 'mountain' ? '/cos30043/s104204233/A3_v1/images/mountain.jpg' : '/cos30043/s104204233/A3_v1/images/ocean.jpg'" 
                :alt="selectedImage === 'mountain' ? 'Premium Collection' : 'Budget Friendly'"
                class="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      firstName: '',
      lastName: '',
      welcomeMessage: '',
      selectedImage: 'mountain'
    }
  },
  methods: {
    updateWelcomeMessage() {
      if (this.firstName && this.lastName) {
        this.welcomeMessage = `Welcome, ${this.firstName} ${this.lastName}! We're excited to have you shop with us.`;
      } else {
        this.welcomeMessage = '';
      }
    }
  }
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