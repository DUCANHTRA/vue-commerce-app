import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  }),

  actions: {
    //addtoCart from ProductCard.vue
    addToCart(product) {
      const productExists = this.cart.filter((item) => item.id === product.id);
      
      if (productExists.length > 0) {
        this.addQty(product.id);
      } else {
        this.cart = [{ ...product, quantity: 1 }, ...this.cart];
        this.saveCart();
      }
    },


    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id); // Remove item with matching ID
      this.saveCart();
    },


    addQty(id) {
      const productIndex = this.cart.findIndex(item => item.id === id);

      this.cart = this.cart.map((item, i) => ({
        ...item,
        quantity: item.quantity + (productIndex === i ? 1 : 0),
      }));
      this.saveCart();
    },


    reduceQty(id) {
      const productIndex = this.cart.findIndex(item => item.id === id);

      this.cart = this.cart.map((product, i) => ({
        ...product,
        quantity: product.quantity - (productIndex === i && product.quantity > 1 ? 1 : 0),
      }));
      this.saveCart();
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
