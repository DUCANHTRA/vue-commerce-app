<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
      cartCount: 0
    }
  },
  methods: {
    updateAuthStatus(status) {
      this.isAuthenticated = status;
      localStorage.setItem('isAuthenticated', status);
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartCount = cart.length;
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;
      this.$router.push({ name: 'login' });
    }
  },
  mounted() {
    this.updateCartCount();
    window.addEventListener('storage', this.updateCartCount);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateCartCount);
  }
}
</script>

<template>
  <div id="app">
    <!--Listen for the authenticated event and update the auth status-->
    <Navigation :isAuthenticated="isAuthenticated" @authenticated="updateAuthStatus"/>
    <main class="main-content">
      <router-view @authenticated="updateAuthStatus"></router-view>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background-color: #f8f9fa;
}

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: 0;
  }
}

/* Mobile-first responsive styles */
.v-container {
  padding: 16px;
}

.v-app-bar {
  padding: 0 16px;
}

/* Tablet breakpoint (768px and up) */
@media (min-width: 768px) {
  .v-container {
    padding: 24px;
  }
  
  .v-app-bar {
    padding: 0 24px;
  }
}

/* Desktop breakpoint (1024px and up) */
@media (min-width: 1024px) {
  .v-container {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .v-app-bar {
    padding: 0 32px;
  }
}
</style>
