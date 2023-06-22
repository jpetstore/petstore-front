<script>

import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";

window.onload = function (){
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
                        }

export default {

  name: "AllOrders",
    components:{HeaderComponent,FooterComponent},
    data(){
        return{
            orderList    :   []
        };
    },
    async created(){
        console.log('created');
        const re = await this.fetchData();//promise对象
        console.log(re.data);
        this.orderList = re.data;
    },

    methods:{
        async fetchData(){
            console.log("111111111")
            try{
                const response = await axios.get('http://localhost:8090/order/getAllOrder'); 
                      
                 return response.data;
            }catch(error){
                console.log(error);
                return 0;
            }
        }
    }   




};

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
