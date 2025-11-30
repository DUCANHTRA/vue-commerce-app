import { defineStore } from "pinia";
import { toast } from "../utils/toast";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  }),

  actions: {
    //addtoCart from ProductCard.vue
    addToCart(product) {
      if (product.stock <= 0) {
        toast.error("Product is out of stock");
        return;
      }

      const productExists = this.cart.find((item) => item._id === product._id);
      
      if (productExists) {
        this.addQty(product._id);
      } else {
        this.cart.unshift({ ...product, quantity: 1 });
        this.saveCart();
        toast.success("Product added to cart");
      }
    },


    removeFromCart(_id) {
      this.cart = this.cart.filter(item => item._id !== _id); // Remove item with matching ID
      this.saveCart();
    },


    addQty(_id) {
      const productIndex = this.cart.findIndex(item => item._id === _id);
      if (productIndex !== -1) {
        const product = this.cart[productIndex];
        if (product.quantity < product.stock) {
          this.cart[productIndex].quantity++;
          this.saveCart();
        } else {
          toast.error("Cannot add more than available stock");
        }
      }
    },


    reduceQty(_id) {
      const productIndex = this.cart.findIndex(item => item._id === _id);

      if (productIndex !== -1) {
        if (this.cart[productIndex].quantity > 1) {
          this.cart[productIndex].quantity--;
        } else {
          this.removeFromCart(_id);
        }
        this.saveCart();
      }
    },


    emptyCart() {
      this.cart = [];
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  },
  getters: {

    total: (state) => {
      let _total = 0;
      for (const item of state.cart) {
        _total += item.price * item.quantity;
      }
      return _total.toFixed(2); // Formats total price to 2 decimal places
    }
  },
});
