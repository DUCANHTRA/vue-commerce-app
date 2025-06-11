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
          <tr v-for="product in cartStore.cart" :key="product.id">

            <th scope="row" class="py-4 px-4">
              <img :src="product.image" :alt="product.title" class="img-fluid" style="max-height: 100px;" />
            </th>

            <td class="py-4 px-4 fw-bold">
              <!--Product title -->
              {{ product.title }}
            </td>

            <td class="py-4 px-4 fw-bold">
              <!--ReduceQty from cart.js -->

              <i @click="cartStore.reduceQty(product.id)" class="bi bi-dash-lg me-3 cursor-pointer"></i>
              <span>{{ product.quantity }}</span>
              <!--AddQty from cart.js -->
              <i @click="cartStore.addQty(product.id)" class="bi bi-plus-lg ms-3 cursor-pointer"></i>
            </td>

            <td class="py-4 px-4 fw-bold">
              $
              <!--product price here -->
              {{ product.price }}
            </td>

            <td class="py-4 px-4">
              <!--removeFromCart function in the click event -->
              <i @click="cartStore.removeFromCart(product.id)" class="bi bi-x-lg cursor-pointer"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="my-4 text-end h3 fw-medium">
      Total: ${{ cartStore.total }}
      <!--write the total getter here -->
    </p>
    <div id="card-container" class="w-50 mx-auto"></div>
    <button
      class="btn btn-primary text-uppercase float-end mb-3"
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
import { onMounted } from "vue";
import { toast } from "../utils/toast";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
let card;
const appId = "<Add App ID here>";
const locationId = "<Add location ID here>";

//InitializeCard() function
async function initializeCard(payments) {
const card = await payments.card();

await card.attach("#card-container");

return card;
}

onMounted(async () => {
  if (!Square) {
   throw new Error("Square.js failed to load properly");
 }

 const payments = Square.payments(appId, locationId);

 try {
   card = await initializeCard(payments);
 } catch (e) {
   console.error("Initializing Card failed", e);
   return;
 }
});

async function tokenize(paymentMethod) {
  //Update tokenization
  const tokenResult = await 
    paymentMethod.tokenize();
    if (tokenResult.status === "OK") {
    return tokenResult.token;
    } else {
    let errorMessage = `Tokenization failed with 
    status: ${tokenResult.status}`;
    if (tokenResult.errors) {
    errorMessage += ` and errors: 
    ${JSON.stringify(tokenResult.errors)}`;
    }

    throw new Error(errorMessage);
    }
}

// status is either SUCCESS or FAILURE;
function displayPaymentResults(status) {
  if (status === "SUCCESS") {
    toast.success("Transaction Successful");
  } else {
    toast.error("Transaction Failed");
  }
}

const submit = async function (event) {
  event.preventDefault();

  const token = await tokenize(card);

  // Old payment processing code
  /*
  fetch("http://0.0.0.0:3000/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      sourceId: token,
      total: cartStore.total,
    }),
    })
    .then((res) => res.json())
    .then((paymentResults) => {
      console.debug("Payment Success", 
    paymentResults);
      cartStore.emptyCart();
      displayPaymentResults("SUCCESS");
    })
    .catch(async (e) => {
      console.error(e.message);
      displayPaymentResults("FAILURE");
  });
  */

  // New payment processing code with database update
  try {
    // First process the payment
    const paymentResponse = await fetch("http://0.0.0.0:3000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId,
        sourceId: token,
        total: cartStore.total,
      }),
    });

    const paymentResults = await paymentResponse.json();
    
    if (paymentResults.success) {
      // If payment successful, update database
      const dbResponse = await fetch("resource/api_square.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId,
          sourceId: token,
          total: cartStore.total,
          cartItems: cartStore.cart
        }),
      });

      const dbResults = await dbResponse.json();
      
      if (dbResults.success) {
        cartStore.emptyCart();
        displayPaymentResults("SUCCESS");
      } else {
        throw new Error(dbResults.error || "Database update failed");
      }
    } else {
      throw new Error("Payment processing failed");
    }
  } catch (error) {
    console.error(error.message);
    displayPaymentResults("FAILURE");
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>