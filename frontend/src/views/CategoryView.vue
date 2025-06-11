  <template>
    <!-- ProductCategory component -->
    <ProductsCategory :category="$route.params.slug" />
  </template>
  
  <script>
  import ProductsCategory from "../components/ProductsCategory.vue";
  export default {
    name: "CategoryView",
    components: {
      ProductsCategory,
    },
  };
  </script>
  