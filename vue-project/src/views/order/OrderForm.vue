<script>
import { defineComponent } from 'vue';
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";

export default defineComponent({
  name: "OrderForm",
  components: {HeaderComponent, FooterComponent},

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
  methods: {
    submitContinue(event) {
      event.preventDefault();
      var Shipping = document.getElementsByName("shippingAddressRequired")[0];
      var changeBox = document.getElementById("Shipping");
      var inputs = changeBox.querySelectorAll('input');
      let order_new
      if (Shipping.checked) {  //修改地址
        order_new = {
          shippingAddressRequired: true,
          cardType: this.order.cardType,
          creditCard: this.order.creditCard,
          expiryDate: this.order.expiryDate,
          firstName: inputs[0].value,
          lastName: inputs[1].value,
          address1: inputs[2].value,
          address2: inputs[3].value,
          city: inputs[4].value,
          state: inputs[5].value,
          zip: inputs[6].value,
          country: inputs[7].value,
        }
        console.log(999);
      } else {
        order_new = {
          shippingAddressRequired: false,
          cardType: this.order.cardType,
          creditCard: this.order.creditCard,
          expiryDate: this.order.expiryDate,
          firstName: null,
          lastName: null,
          address1: null,
          address2: null,
          city: null,
          state: null,
          zip: null,
          country: null,
        }
      }
      console.log(order_new);
      axios.post("http://localhost:8090/order/confirmOrder", order_new,{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
          .then(response => {
            console.log("00000000")
            // 请求成功
            this.$router.push("/order/ConfirmOrder")
          })
          .catch(error=>{
            console.error(error);
          })
    },
    shippingShow() {
      console.log("aaa")
      var Shipping = document.getElementById("Shipping")
      var ShippingBox = document.getElementsByName("shippingAddressRequired")[0];
      if (ShippingBox.checked) {
        console.log(1);
        var ship_ToFirstName = document.getElementById("billToFirstName").value;
        var ship_ToLastName = document.getElementById("billToLastName").value;
        var ship_Address1 = document.getElementById("billAddress1").value;
        var ship_Address2 = document.getElementById("billAddress2").value;
        var ship_City = document.getElementById("billCity").value;
        var ship_State = document.getElementById("billState").value;
        var ship_Zip = document.getElementById("billZip").value;
        var ship_Country = document.getElementById("billCountry").value;
        console.log(ship_ToFirstName);
        Shipping.innerHTML = "<table id='table-3'>\n" +
            "\t<tr>\n" +
            "\t\t<th colspan=2>Shipping Address</th>\n" +
            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>First name:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipToFirstName\" value=" + ship_ToFirstName + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Last name:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipToLastName\" value=" + ship_ToLastName + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Address 1:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipAddress1\" value=" + ship_Address1 + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Address 2:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipAddress2\" value=" + ship_Address2 + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>City:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipCity\" value=" + ship_City + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>State:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipState\" value=" + ship_State + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Zip:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipZip\" value=" + ship_Zip + ">\n" +

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Country:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input type=\"text\" name=\"shipCountry\" value=" + ship_Country + ">\<n></n>"
      } else {
        Shipping.innerHTML = null;
      }
    },
    async fetchData(){
      console.log()
      try{
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8090/order/getOrder');
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
  <div id="Catalog">

    <form  @submit = "submitContinue" method="post">

      <table>
        <tr>
          <th colspan=2>Payment Details</th>
        </tr>
        <tr>
          <td>Card Type:</td>
          <td>
            <select  v-model="order.cardType" name="cardType">
              <option th:value="${session.creditCardTypes}" th:text="${session.creditCardTypes}"> </option>
              <option value="Credit">Credit </option>
              <option value="Quasi">Quasi </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Card Number:</td>
          <td>
            <input type="text" v-model="order.creditCard" name="creditCard">
          </td>
        </tr>
        <tr>
          <td>Expiry Date (MM/YYYY):</td>
          <td>
            <input type="text" v-model="order.expiryDate" name="expiryDate">
          </td>
        </tr>



        <tr>
          <th colspan=2>Billing Address</th>
        </tr>

        <tr>
          <td>First name:</td>
          <td>
            <input type="text" v-model="order.billToFirstName" name="firstName" id="billToFirstName"  readonly>
          </td>
        </tr>
        <tr>
          <td>Last name:</td>
          <td>
            <input type="text" v-model="order.billToLastName" name="lastName" id="billToLastName"  readonly>
          </td>
        </tr>
        <tr>
          <td>Address 1:</td>
          <td>
            <input type="text" v-model="order.billAddress1" name="address1" id="billAddress1"  readonly>
          </td>
        </tr>
        <tr>
          <td>Address 2:</td>
          <td>
            <input type="text" v-model="order.billAddress2" name="address2" id="billAddress2"  readonly>
          </td>
        </tr>
        <tr>
          <td>City:</td>
          <td>
            <input type="text" v-model="order.billCity" name="city" id="billCity"  readonly>
          </td>
        </tr>
        <tr>
          <td>State:</td>
          <td>
            <input type="text" v-model="order.billState" name="state"  id="billState"  readonly>
          </td>
        </tr>
        <tr>
          <td>Zip:</td>
          <td>
            <input type="text" v-model="order.billZip" name="zip" id="billZip"  readonly>
          </td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>
            <input type="text" v-model="order.billCountry" name="country" id="billCountry"  readonly>
          </td>
        </tr>

        <tr>
          <td colspan=2>
            <input type="checkBox" name="shippingAddressRequired" value="shippingAddressRequired" @click="shippingShow">
            Ship to different address...
          </td>
        </tr>
      </table>

      <table id="Shipping">

      </table>
      <input type="submit" value="Continue">

    </form>
  </div>

  <FooterComponent/>
  </html>
</template>

<style scoped>
@import "@/assets/css/jpetstore.css";
</style>