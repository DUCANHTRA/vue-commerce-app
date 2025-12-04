<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="logo">E-Commerce</router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/shopping" class="nav-link">Shopping</router-link>
        <router-link to="/news" class="nav-link">News</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/cart" class="nav-link">
          <i class="bi bi-cart3"></i>
          <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
        </router-link>
        <!--Delete this
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <a href="#" @click.prevent="handleLogout" class="nav-link">Logout</a>
        -->
        
        <!-- Show these links when not authenticated -->
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
        </template>
        
        <!-- Show these links when authenticated -->
        <template v-if="isAuthenticated">
          <router-link v-if="isAdmin" to="/dashboard" class="nav-link">Dashboard</router-link>
          <a href="#" @click.prevent="handleLogout" class="nav-link">Logout</a>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from "../stores/cart";
import { computed } from "vue";

export default {
  name: 'Navigation',
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const cartStore = useCartStore();

    // reactive cart count
    const cartCount = computed(() => cartStore.cart.length);

    const isAdmin = computed(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.role === 'admin';
    });

    return { cartCount, isAdmin };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated'); // This can be removed later
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$emit('authenticated', false);
      this.$router.push({ name: 'login' });
    }
  }
}
</script>


<style scoped>
.navigation {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
}

.router-link-active {
  background-color: rgba(255,255,255,0.2);
}

.cart-count {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  margin-left: 4px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
  }
}
</style> 