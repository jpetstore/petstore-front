<script>
import {defineComponent } from 'vue';
import axios from 'axios';
import HeaderComponent from "../common/header.vue"
import FooterComponent from "../common/footer.vue"


export default defineComponent({
    name: "Product",
    components:{ HeaderComponent, FooterComponent},
    data(){
        return{
            itemlist    :   [],
            product     :   {}
        };
    },
    async created(){
        var productId = this.$route.params.productId;
        const re_itemls = await axios.get('http://localhost:8090/catalog/product/'+ productId + '/items');
        const re_product = await axios.get('http://localhost:8090/catalog/product/'+ productId)
        this.itemlist = re_itemls.data.data;
        this.product = re_product.data.data;
    },
    methods:{
        viewItem(productId) {
      // 导航到商品详情页面，并传递商品ID作为路由参数
      //this.$router.push({ name: 'product', params: { id: productId } });

      this.$router.push('/catalog/item/'+productId)
    },
        async add_to_cart(item){
            console.log('Got it:' + item.itemId)
            const res_login_info = await axios.get('http://localhost:8090/account/get_loginUser_info')
          console.log(res_login_info);
            var is_login = res_login_info.data.status==0?true:false
            if(is_login){
                console.log('ADDED TO CART')
                const resp = await axios.get('http://localhost:8090/cart/addItemToCart?workingItemId=' + item.itemId)
                //修改路由
                this.$router.push('/cart')
            }else{
                console.log('Sign in first')
                //修改路由
                this.$router.push('/catalog/main')
            }
        }
    }
})



</script>

<template>
<HeaderComponent />
<div class = "body11">
    <!-- <div id="BackLink">
 <a th:text="'Return to'+ ${product.categoryId}" th:href="@{viewCategory(categoryId=${product.categoryId})}">错误提示product.categoryId}</a>
<a href="/catalog/" + product.categoryId >Return to {{ product.categoryId }}</a>
</div> -->
<div id="BackLink">
    <router-link to="/catalog/main">Return to {{ product.categoryId }}</router-link>
</div>
<div id="Catalog">

<h2>{{ product.name }}</h2>
   <!-- <a th:text="${product.productId}">??</a> -->
<table>
    <thead>
        <tr>
        <th>Item ID</th>
        <th>Product ID</th>
        <th>Description</th>
        <th>List Price</th>
        <th>&nbsp;</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for=" (item,index) in itemlist" >
        <td>
            <a @click="viewItem(item.itemId)">{{item.itemId}}</a>
<!--                <a th:text="${product.productId}">??</a>-->
        </td>
        <td>
            {{item.productId}}
        </td>
<!--            <td th:text="${item.attribute1}+' '+${item.attribute2}+' '+${item.attribute3}+' '+ ${item.attribute4}+' '+ ${item.attribute5} +' '+${product.name}">-->
<!--                错误提示item.attribute1,item.attribute2,item.attribute3,item.attribute4,item.attribute5,sessionScope.product.name-->
<!--            </td>-->
        <td>
            <span v-if="item.attribute1 !== null">
                  {{item.attribute1}}
            </span>
            <span v-if="item.attribute2 !== null">
                {{ item.attribute2 }}
            </span>
            <span v-if="item.attribute3 !== null">
                {{ item.attribute3 }}
            </span>
            <span v-if="item.attribute4 !== null">
                {{ item.attribute4 }}
            </span>
            <span v-if="item.attribute5 !== null">
                {{ item.attribute5 }}
            </span>
        </td>
        <td>
           {{ item.listPrice }}
        </td>
        <td>
            <a class="Button"  @click="add_to_cart(item)">Add to Cart</a>
        </td>
    </tr>
    </tbody>
    

</table>

</div>
</div>

<FooterComponent />
</template>

<style scoped>
  @import "../../assets/css/jpetstore.css";
</style>