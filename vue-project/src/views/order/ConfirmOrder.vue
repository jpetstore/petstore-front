<script>
import { defineComponent } from 'vue';
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";

export default defineComponent({
  name: "ConfirmOrder",
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      order: []
    };
  },
  async created(){
    console.log('created');
    const re = await this.fetchData();//promise对象
    console.log(re.data);
    this.order = re.data;
  },
  methods:{
   async submitPay(event){
      event.preventDefault();
      axios.post(" http://localhost:8090/order/finalOrder")
          .then(response => {
            console.log(response.data)
            请求成功,显示返回的html
            this.$router.push({
              path: '/blank',
              query: {
                htmlContent: response.data
              }
            });
          })
          .catch(error=>{
            console.error(error);
          })
    },
    async fetchData(){
      console.log()
      try{
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8090/order/getConfirmOrder');
        return response.data;
      }catch(error){
        console.log(error);
        return 0;
      }
    }
  }
});
</script>

<template>
  <!DOCTYPE html>
  <html lang="en">
  <HeaderComponent/>

  <div id="BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
  </div>

  <div id="Catalog">
    Please confirm the information below and then press continue...
    <form @submit = "submitPay" method="post">
      <table>
        <tr>
          <th align="center" colspan="2">
            <font size="4">
              <b>Order</b>
            </font>
            <br />
            <font size="3">
              <b>
                {{order.expiryDate}}
              </b>
            </font>
          </th>
        </tr>

        <tr>
          <th colspan="2">Billing Address</th>
        </tr>
        <tr>
          <td>First name:</td>
          <td>{{order.billToFirstName}}</td>
        </tr>
        <tr>
          <td>Last name:</td>
          <td>{{order.billToLastName}}</td>
        </tr>
        <tr>
          <td>Address 1:</td>
          <td>{{order.billAddress1}}</td>
        </tr>
        <tr>
          <td>Address 2:</td>
          <td>{{order.billAddress2}}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{{order.billCity}}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{{order.billState}}</td>
        </tr>
        <tr>
          <td>Zip:</td>
          <td>{{order.billZip}}</td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>{{order.billCountry}}</td>
        </tr>
        <tr>
          <th colspan="2">Shipping Address</th>
        </tr>
        <tr>
          <td>First name:</td>
          <td>{{order.shipToFirstName}}</td>
        </tr>
        <tr>
          <td>Last name:</td>
          <td>{{order.shipToLastName}}</td>
        </tr>
        <tr>
          <td>Address 1:</td>
          <td>{{order.shipAddress1}}</td>
        </tr>
        <tr>
          <td>Address 2:</td>
          <td>{{order.shipAddress2}}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{{order.shipCity}}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{{order.shipState}}</td>
        </tr>
        <tr>
          <td>Zip:</td>
          <td>{{order.shipZip}}</td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>{{order.shipCountry}}</td>
        </tr>

      </table>
      <input type="submit" name="confirmed" value="支付宝支付">
    </form>
  </div>
  <FooterComponent/>
  </html>
</template>

<style scoped>
@import "@/assets/css/jpetstore.css";

</style>
