<script>
import HeaderComponent from "@/views/common/header.vue";
import FooterComponent from "@/views/common/footer.vue";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "Category",
  components : {
    HeaderComponent,
    FooterComponent
  },


  data() {
    return {
      products: [], // 商品列表
    };
  },

  mounted() {
    // 在组件挂载时发送请求获取商品信息
    //var categoryId = this.$router.params.categoryId;
    //console.log(categoryId)
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      const categoryId = this.$route.params.categoryId;
      const url = ` http://localhost:8090/catalog/categories/${categoryId}/products`;
      console.log(categoryId)
      console.log(url)
      axios.get(url)
          .then(response => {
            const data = response.data;

            if (data.status === 0) {
              this.products = data.data;
            } else {
              console.error(data.msg);
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    viewItem(productId) {
      // 导航到商品详情页面，并传递商品ID作为路由参数
      //this.$router.push({ name: 'product', params: { id: productId } });

      this.$router.push('/catalog/product/'+productId)
    },
  },
}
</script>
<template>
  <!DOCTYPE html>
  <html lang="en">
  <HeaderComponent/>
  <div id="BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
  </div>

  <div id="Catalog">

    <h2>{{categoryId}}</h2>
    <table>
      <tr>
        <th>Product ID</th>
        <th>Name</th>
      </tr>

<!--      <tr th:each="product:${productList}">-->
<!--        <td>-->
<!--          <a th:href="@{/catalog/viewProduct(productId=${product.productId},name=${product.name},categoryId=${product.categoryId},description=${product.description})}"-->
<!--             th:text="${product.productId}">-->
<!--          </a>-->
<!--        </td>-->
<!--        <td th:text="${product.name}">product.name</td>-->

<!--      </tr>-->
      <tr v-for="product in products">
        <td>
          <a @click="viewItem(product.productId)">{{product.productId}}</a>
        </td>
        <td>{{ product.name }}</td>
      </tr>
    </table>


  </div>

  <FooterComponent/>      <!--导入footer-->
  </html>
</template>



<style scoped>
@import "@/assets/css/jpetstore.css";
</style>