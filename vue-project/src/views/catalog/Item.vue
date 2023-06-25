

<template>
  <HeaderComponent/>
  <div id="BackLink">

<!--    <a th:text="'Return to'+ ${product.productId}" th:href="@{viewProduct(productId=${product.productId},name=${product.name},categoryId=${product.categoryId},description=${product.description})}"></a>-->
  </div>

  <div id="Catalog" v-if="item">

    <table>
      <tr>
        <td>
          <img id="myImage" name="myImage" :src="item.imageUrl" alt="Product Image">
        </td>
      </tr>
      <tr>
<!--        <td>-->
<!--          <b v-if="!msg">{{item.itemId}}</b>-->
<!--          <b v-else>{{msg}}</b>-->
<!--        </td>-->
      </tr>
      <tr>
        <td>
          <b v-if="item.attribute1 !== null" v-text="item.attribute1">
          </b>
          <b v-if="item.attribute2" v-text="item.attribute2">
          </b>
          <b v-if="item.attribute3" v-text="item.attribute3">
          </b>
          <b v-if="item.attribute4" v-text="item.attribute4">
          </b>
          <b v-if="item.attribute5" v-text="item.attribute5">
          </b>
        </td>

      </tr>
      <tr>
        <td>{{item.productName}}</td>
      </tr>
      <tr>
        <td >
          <span>qty: </span>
          <span style="color:blue" >{{item.quantity}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span>{{ 'listPrice: ' + formatCurrency(item.listPrice) }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <button @click="addItemToCart(item.itemId)">Add to Cart</button>
        </td>
      </tr>
    </table>

  </div>
  <FooterComponent/>      <!--导入footer-->
</template>

<script>
import HeaderComponent from "@/views/common/header.vue";
import FooterComponent from "@/views/common/footer.vue";
import axios from "axios";

export default {
  name: "Item",
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      item: null, // 商品详情对象
      msg: null
    };
  },

  async created() {
    // 在组件挂载时发送请求获取商品详情
    this.fetchItem();
  },
  methods: {
      fetchItem() {
      const itemId = this.$route.params.itemId; // 获取路由参数中的商品ID
      axios.defaults.withCredentials = true;
      const url = `http://localhost:8090/catalog/items/${itemId}`;
      console.log(itemId)
      console.log(url)
      axios.get(url)
          .then(response => {
            const data = response.data;
            console.log(data)
            if (data.status === 0) {
              console.log(data)
              this.item = data.data
              console.log(this.item)
              this.fetchItemImage(this.item.productId);
            } else {
              this.msg = data.msg;
              console.error(data.msg);
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    fetchItemImage(productId) {
      const url = `http://localhost:8090/catalog/showImage?productId=${productId}`;
      axios
          .get(url, { responseType: 'blob' }) // 设置响应类型为 blob
          .then(response => {
            const data = response.data
            console.log(data)
            const imageUrl = URL.createObjectURL(response.data); // 创建图像 URL
            this.item.imageUrl = imageUrl;
          })
          .catch(error => {
            console.error(error);
          });
    },
    formatCurrency(value) {
      // 实现带有美元符号和千位分隔符的货币格式化
      return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    addItemToCart(itemId) {
      const payload = {
        workingItemId: itemId
      };
      console.log(itemId)
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:8090/cart/addItemToCart', {params: payload})
          .then(response => {
            const data = response.data;
            if (data.status === 0) {
              // 成功添加到购物车
              this.$router.push({ name: 'cart' }); // 可以根据需要跳转到购物车页面
            } else {
              // 添加到购物车失败
              this.msg = "添加失败"
              console.error();
            }
          })
          .catch(error => {
            console.error(error);
          });
    }
    },
}
</script>
<style scoped>
@import "@/assets/css/jpetstore.css";
</style>