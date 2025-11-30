<template>

  <div class="container mt-4" v-if="cartStore.cart.length">
    <h1 class="my-4 text-center display-4 fw-bold">Checkout Cart</h1>
    <div class="table-responsive">
      <table class="table table-hover">

        <thead class="table-light">
          <tr>
            <th scope="col" class="py-3 px-4">Product</th>
            <th scope="col" class="py-3 px-4">Name</th>
            <th scope="col" class="py-3 px-4">Quantity</th>
            <th scope="col" class="py-3 px-4">Price</th>
            <th scope="col" class="py-3 px-4">Remove</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in cartStore.cart" :key="product._id">

            <th scope="row" class="py-4 px-4">
              <img :src="product.image" :alt="product.title" class="img-fluid" style="max-height: 100px;" />
            </th>

            <td class="py-4 px-4 fw-bold">
              <!--Product title -->
              {{ product.title }}
            </td>

            <td class="py-4 px-4 fw-bold">
              <!--ReduceQty from cart.js -->

              <i @click="cartStore.reduceQty(product._id)" class="bi bi-dash-lg me-3 cursor-pointer"></i>
              <span>{{ product.quantity }}</span>
              <!--AddQty from cart.js -->
              <i @click="cartStore.addQty(product._id)" class="bi bi-plus-lg ms-3 cursor-pointer"></i>
            </td>

            <td class="py-4 px-4 fw-bold">
              $
              <!--product price here -->
              {{ product.price }}
            </td>

            <td class="py-4 px-4">
              <!--removeFromCart function in the click event -->
              <i @click="cartStore.removeFromCart(product._id)" class="bi bi-x-lg cursor-pointer"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="my-4 text-end h3 fw-medium">
      Total: ${{ cartStore.total }}
      <!--write the total getter here -->
    </p>
    <button
      class="btn btn-primary text-uppercase mb-3"
      @click="submit"
    >
      Proceed to checkout
    </button>
  </div>
  <!-- Task 5: Add the v-else condition here -->
  <div v-else class="container my-5">
    <div class="card shadow-sm mx-auto" style="max-width: 500px;">
      <div class="card-body text-center">
        <img class="img-fluid mb-3" src="/images/Empty-Cart.svg" alt="emptyCart" />
        <h2 class="h3 text-muted">Cart is empty</h2>
        <RouterLink to="/" class="text-decoration-none">
          <button class="btn btn-primary text-uppercase mt-3">
            Continue shopping
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from "../utils/toast";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCartStore } from "../stores/cart";
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const submit = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    toast.error("Please login to place an order.");
    router.push({ name: 'login' });
    return;
  }

  const orderItems = cartStore.cart.map(item => ({
    product: item._id,
    quantity: item.quantity,
    price: item.price
  }));

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: user.user.id,
        items: orderItems,
        total: cartStore.total,
        shippingAddress: "123 Main St, Anytown, USA" // Placeholder
      })
    });

    const data = await response.json();

    if (data.success) {
      cartStore.emptyCart();
      toast.success("Order placed successfully!");
      router.push({ name: 'home' });
    } else {
      throw new Error(data.message || "Failed to place order");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error(error.message || "Error placing order");
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>