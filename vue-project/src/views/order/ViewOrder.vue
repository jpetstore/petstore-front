<script>
import { defineComponent } from 'vue';
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";

export default defineComponent({
  name: "ViewOrder",
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
  <html lang="en">
  <HeaderComponent/>
  <ul class="message">
    <li>Thank you, your order has been submitted.</li>
  </ul>

  <div id = "BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
  </div>

  <div id="Catalog">

    <table>
      <tr>
        <th align="center" colspan="2" >
          <span>{{order.orderId}}</span>
          <!--                <fmt:formatDate th:value="${session.order.orderDate}" pattern="yyyy/MM/dd hh:mm:ss" />-->
          <!--                <span th:text = "${#dates.format(session.order.orderDate)}"></span>-->
          <span>{{order.orderDate}}</span>
        </th>
      </tr>
      <tr>
        <th colspan="2">Payment Details</th>
      </tr>
      <tr>
        <td>Card Type:</td>
        <td>{{order.cardType}}</td>
      </tr>
      <tr>
        <td>Card Number:</td>
        <td>{{order.creditCard}}</td>
      </tr>
      <tr>
        <td>Expiry Date (MM/YYYY):</td>
        <td>{{order.expiryDate}}</td>
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
        <td>{{order.shipAddress1}}</td>
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
      <tr>
        <td>Courier:</td>
        <td>{{order.courier}}</td>
      </tr>


      <tr>
        <td colspan="2" th:text="'Status:'+${session.order.courier}" ></td>
      </tr>
      <tr>
        <td colspan="2">
          <table>
            <tr>
              <th>Item ID</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr v-for="lineItem in order.lineItems" :key="lineItem.item.itemId">
              <td>{{lineItem.item.itemId}}</td>

              <td v-if="lineItem.item">
                <b>{{lineItem.item.attribute1}}</b>
                <b>{{lineItem.item.attribute2}}</b>
                <b>{{lineItem.item.attribute3}}</b>
                <b>{{lineItem.item.attribute4}}</b>
                <b>{{lineItem.item.attribute5}}</b>
              </td>
              <td>{{lineItem.quantity}}</td>
              <td>{{lineItem.unitPrice}}</td>
            </tr>
            <tr>
              <th colspan="5">
                Total:
                <!--                                <td th:text="${#numbers.formatDecimal(session.order.totalPrice/100.0,1,2)}">-->
              <th>{{order.totalPrice}}</th>
              <!--                            <fmt:formatNumber th:text="${session.order.totalPrice}" pattern="$#,##0.00" />-->
              </th>
            </tr>
          </table>
        </td>
      </tr>
      <!--        <tr><td> <a th:="@{/catalog/ReviewForm(itemId=${item.itemId},-->
      <!--                                                productId=${product.productId},name=${product.name},categoryId=${product.categoryId},description=${product.description})}">-->
      <!--review now!-->
      <!--        </a>-->
      <!--        </td>-->
      <!--        </tr>-->
    </table>
    <a href="/account/AllOrders" class="Button">View All Orders</a>
  </div>
  <FooterComponent/>
  </html>

</template>

<style scoped>
@import "@/assets/css/jpetstore.css";
</style>