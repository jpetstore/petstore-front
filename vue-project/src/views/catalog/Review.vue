<script>
import {defineComponent } from 'vue';
import axios from 'axios';
import HeaderComponent from "../common/header.vue"
import FooterComponent from "../common/footer.vue"


export default defineComponent({
    name: "Review",
    components:{ HeaderComponent, FooterComponent},
    data(){
        return{
            itemlist    :   []
        };
    },
    async created(){
        // console.log('created');
        // var productId = this.$route.params.productId;
        // console.log(productId);
        // const re = await this.fetchData(productId);//promise对象
        // this.itemlist = re.data;
    },
    // methods:{
    //     async fetchData(id){
    //         console.log(id)
    //         try{
    //             const response = await axios.get('http://localhost:8090/catalog/product/'+ id + '/items');
    //             return response.data;
    //         }catch(error){
    //             console.log(error);
    //             return 0;
    //         }
    //     }
    // }   
})



</script>

<template>
<HeaderComponent />

<div id="BackLink">
    <a th:text="'Return to'+ ${product.productId}" th:href="@{viewProduct(productId=${product.productId},name=${product.name},categoryId=${product.categoryId},description=${product.description})}">错误提示product.productId</a>
</div>

<div id="Catalog">

    <table>
        <tr>
            <td>
                <img id="myImage" name="myImage" th:src="@{/catalog/showImage.do(productId=${product.productId})}">
            </td>
        </tr>
        <tr>
            <td>
                <b th:text="${item.itemId}">错误提示item.itemId</b>
            </td>
        </tr>
        <tr>
            <td>
                <b th:if="${item.attribute1!=null}"
                   th:text="${item.attribute1}">
                </b>
                <b th:if="${item.attribute2!=null}"
                   th:text="${item.attribute2}">
                </b>
                <b th:if="${item.attribute3!=null}"
                   th:text="${item.attribute3}">
                </b>
                <b th:if="${item.attribute4!=null}"
                   th:text="${item.attribute4}">
                </b>
                <b th:if="${item.attribute5!=null}"
                   th:text="${item.attribute5}">
                </b>
            </td>

        </tr>
        <tr>
            <td th:text="${product.name}">错误提示roduct.name</td>
        </tr>
        <tr>
            <td >
                <span>qty: </span>
                <span style="color:blue" th:text="${item1}">错误提示item1</span>

            </td>
        </tr>
        <tr>
            <td th:if="${item1} le 0">status:
                <span style="color:blue">
                    Back ordered
                </span>
            </td>
            <td th:if="${item1} gt 0">status:
                <span style="color:blue">
                   in stock
                </span>
            </td>
        </tr>
        <tr>
            <td>
                <fmt:formatNumber th:text="'listPrice: '+${item.listPrice}" pattern="$#,##0.00" />
            </td>
        </tr>
        <tr>
            <td>
                <a class="Button" th:href="@{/cart/addItemToCart(workingItemId=${item.itemId})}">Add to Cart</a>
            </td>
        </tr>
    </table>

    <form action="/catalog/review" method="post">
        <input type="text" name="review" placeholder="please put in your precious review">
        <input type="submit" class="pageInput" value="Push the review">
    </form>

    <!--评论区域-->
    <table>
        <tr>
            <td>Reviews:</td>
            <td>        </td>
        </tr>



        <tr th:each="review:${reviewList}">
            <td>
                <a th:text="${review.username}">错误提示：review.username</a>
            </td>
            <td th:text="${review.review}">
                错误提示：review.review
            </td>
        </tr>

    </table>
</div>

<FooterComponent />
</template>

<style scoped>
  @import "../../assets/css/jpetstore.css";
</style>