<script setup>
import {defineComponent} from 'vue';
import { ref } from 'vue';
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';

export default {
  mounted() {
    onMounted(() => {
      //挂载函数，页面加载完成之后调用
    var arr = document.getElementsByClassName("refundBtn")
    for (var i=0; i<arr.length; i++){
        arr[i].onclick = function (){
            var msg = prompt("若确认申请退款，请提交理由：")
            if(msg != null){
                var orderid = this.id;
                alert("退款申请已提交")
                location.href = "/order/refundOrder?orderid=" + orderid + "&msg=" + msg
                }
            }
        }
    });
  },
};
export default defineComponent({
    name: "AllOrders",
    components:{HeaderComponent,FooterComponent}
})

 </script>


<template>

<HeaderComponent/>      <!--导入header-->

<div id = "BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
</div>

<div id="Catalog">
    <table>
        <thead>
            <tr>
                <td>订单ID</td>
                <td>订单实付款</td>
                <td>下单日期</td>
                <td>操作</td>
                <td>订单状态</td>
            </tr>
        </thead>
        <tbody>
        <tr v-for="order in orderList" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.orderDate }}</td>
            <td><button v-if="order.status != '待退款' && order.status !='已退款' && order.status != '拒绝退款'" id="order.orderId"  class="refundBtn" type="button">申请退款</button></td>
            <td>{{ order.status }}</td>
        </tr>
      
        </tbody>
    </table>
</div>
<FooterComponent/> 
</template>
<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>
