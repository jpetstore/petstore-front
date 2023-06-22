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
            itemlist    :   []
        };
    },
    async created(){
        console.log('created');
        var productId = this.$route.params.productId;
        console.log(productId);
        // this.fetchData(productId)
        //     .then(()=>{
        //     console.log('s');
        // })
        //     .catch(error=>{
        //     console.error(error);
        // });
        // console.log(this.itemlist);
        const re = await this.fetchData(productId);//promise对象
        this.itemlist = re.data;
        // console.log('0');
    },
    // mounted(){
    //     console.log(this.itemlist);
    //     console.log('1')
    // }
    methods:{
        async fetchData(id){
            console.log(id)
            try{
                const response = await axios.get('http://localhost:8090/catalog/product/'+ id + '/items');
                // console.log(response)
                // console.log(response.data)
                return response.data;
            }catch(error){
                console.log(error);
                return 0;
            }
        }
    }   
})



</script>

<template>
<HeaderComponent />
<div class = "body11">
    <div id="BackLink">
<!-- 
<a th:text="'Return to'+ ${product.categoryId}" th:href="@{viewCategory(categoryId=${product.categoryId})}">错误提示product.categoryId}</a> -->

</div>
<div id="Catalog">

<!-- <h2>{{ product.name }}</h2> -->
<!--    <a th:text="${product.productId}">??</a>-->
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
            <router-link :to="{name : Main}">{{ item.itemId }}</router-link>
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
            <a class="Button" @click="{}">Add to Cart</a>
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