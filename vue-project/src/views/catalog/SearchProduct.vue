<script>
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import $ from 'jquery';
import axios from 'axios';

export default {
    name: "search",
    components : {
    HeaderComponent,
    FooterComponent
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
        toProduct(productId) {
          this.$router.push('/catalog/product/'+productId);
        }

    },
    created(){
        const productsData = JSON.parse(this.$route.query.products || '[]');
        this.products = productsData;
        console.log(this.products);
    }
} 
</script>

<template>
<!DOCTYPE html>
<html lang="en">
<HeaderComponent/>      <!--导入header-->

    <div id="BackLink">
        <a href="/catalog/main">Return to Main Menu</a>
    </div>

    <div id="Catalog">
        <table>
            <tr>
                <th>Product ID</th>
                <th>Category Id</th>
                <th>Name</th>
                <th>Description</th>
            </tr>

            <tr v-for="product in products.data" :key="product.productId">
              <td> <a @click="toProduct(product.productId)">{{ product.productId }}</a> </td>
                <td>{{ product.categoryId }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
            </tr>
        </table>
    </div>

<FooterComponent/>      <!--导入footer-->
</html>
</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>



