<script>

import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";
import router from "@/router";

export default {

  name: "AllOrders",
    components:{HeaderComponent,FooterComponent},
    data(){
        return{
            orderList    :   []
        };
    },
  
    async mounted(){
        console.log('created');
        const re = await this.fetchData();//promise对象
        console.log(re.data);
        this.orderList = re.data;



        this.$nextTick().then(() => {
      // 也支持promise
      console.log("加载完成");
   var arr = document.getElementsByClassName("refundBtn")
   console.log(arr.length);
                           for (var i=0; i<arr.length; i++){
                               console.log(i);
                               arr[i].onclick = function (){
                                   var msg = prompt("若确认申请退款，请提交理由：")
                                   if(msg != null){
                                       var orderid = this.id;
                                       alert("退款申请已提交:"+orderid);
                                  
                                      axios.get("http://localhost:8090/order/refundOrder?orderid=" + orderid + "&msg=" + msg); 
                                      this.$router.push('/account/MyAccount')
                                   }
                               }
                           }
       
      // 这个函数中DOM必定渲染完成
    })
    },
   
    methods:{
      
        async fetchData(){
            console.log("111111111")
            try{
                axios.defaults.withCredentials = true;
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
            <td><button v-if="order.status != 'Q' && order.status !='Y' && order.status != 'S'" :id="order.orderId"  class="refundBtn" type="button">申请退款</button></td>
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
