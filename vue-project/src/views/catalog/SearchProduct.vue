<script>
import {defineComponent} from 'vue';
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';

export default({
    name: "header",
    components:{HeaderComponent,FooterComponent}
})
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
                <th>&nbsp;</th>
                <th>Product ID</th>
                <th>Name</th>
            </tr>

            <tr v-for="product in products">
                <td>
                    <a th:href="@{viewProduct(productId=${product.productId},name=${product.name},categoryId=${product.categoryId},description=${product.description})}">
                        <image th:src="${product.description}"/>
                    </a>
                </td>
                <td> {{ product.id }} </td>
                <td> {{ product.name }} </td>
            </tr>
        </table>
    </div>

<FooterComponent/>      <!--导入footer-->
</html>
</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>



