<template>
  <div>
    <HeaderComponent/>
    <div id="BackLink">
      <a href="/catalog/main">Return to Main Menu</a>
    </div>

    <div id="Catalog">
      <div id="Cart">
        <h2>Shopping Cart</h2>
        <table id="carttable">
          <tr>
            <th><b>Item ID</b></th>
            <th><b>Product ID</b></th>
            <th><b>Description</b></th>
            <th><b>In Stock?</b></th>
            <th><b>Quantity</b></th>
            <th><b>List Price</b></th>
            <th><b>Total Cost</b></th>
            <th><b>&nbsp;</b></th>
          </tr>
          <tr v-if="cartItems.length === 0">
            <td colspan="8"><b>Your cart is empty.</b></td>
          </tr>
          <tr v-else v-for="cartItem in cartItems" :key="cartItem.itemVO.itemId">
            <td>
              <a :href="`/catalog/item/${cartItem.itemVO.itemId}`">{{ cartItem.itemVO.itemId }}</a>
            </td>
            <td>{{ cartItem.itemVO.productId }}</td>
            <td>
              <template v-if="cartItem.itemVO.attribute1">
                <b>{{ cartItem.itemVO.attribute1 }}</b>
              </template>
              <template v-if="cartItem.itemVO.attribute2">
                <b>{{ cartItem.itemVO.attribute2 }}</b>
              </template>
              <template v-if="cartItem.itemVO.attribute3">
                <b>{{ cartItem.itemVO.attribute3 }}</b>
              </template>
              <template v-if="cartItem.itemVO.attribute4">
                <b>{{ cartItem.itemVO.attribute4 }}</b>
              </template>
              <template v-if="cartItem.itemVO.attribute5">
                <b>{{ cartItem.itemVO.attribute5 }}</b>
              </template>
            </td>
            <td>{{ cartItem.instock }}</td>
            <td>
              <input type="text" :name="cartItem.itemVO.itemId" v-model="cartItem.quantity" @blur="updateItem(cartItem)"/>
            </td>
            <td>
              <span>{{ 'listPrice: ' + formatCurrency(cartItem.itemVO.listPrice) }}</span>
            </td>
            <td>
              <div :id="`itemtotalcost${cartItem.itemVO.itemId}`">
                <span>{{ 'listPrice: ' + formatCurrency(cartItem.totalCost) }}</span>
              </div>
            </td>
            <td>
              <button @click="removeFromCart(cartItem.itemVO.itemId)">Remove</button>
            </td>
          </tr>
        </table>

        <p v-if="cartItems.length !== 0">
          <a href="/order/OrderForm" class="Button">Proceed to Checkout</a>

        </p>

      </div>

      <div id="Separator">&nbsp;</div>
    </div>

    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from "@/views/common/header.vue";
import FooterComponent from "@/views/common/footer.vue";
import axios from 'axios';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      cartItems: [],
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    getCart() {
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:8090/cart/getCart')
          .then(response => {
            if (response.data.status === 0) {
              console.log(response.data.data)
              this.cartItems = response.data.data;
              console.log(this.cartItems)
            } else if (response.data.status === 10) {
              // Not logged in, handle accordingly
            }
          })
          .catch(error => {
            // Handle error
          });
    },
    updateItem(cartItem) {
      const payload = {
        itemId: cartItem.itemVO.itemId,
        quantity: cartItem.quantity
      };
      axios.defaults.withCredentials = true;
        axios.get('http://localhost:8090/cart/updateCartItem', { params: payload })
          .then(response => {
            if (response.data.isRemoved === 'false') {
              // Item quantity updated, handle accordingly
              console.log(response.data)
              cartItem.totalCost = response.data.totalcost;
            } else if (response.data.isRemoved === 'true') {
              // Item removed, handle accordingly
              this.removeFromCart(cartItem.itemVO.itemId);
            }
          })
          .catch(error => {
            // Handle error
          });
    },
    removeFromCart(itemId) {
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:8090/cart/removeItemFromCart', { params: { itemId } })
          .then(response => {
            if (response.data.status === 0) {
              // Item removed, handle accordingly
              this.cartItems = this.cartItems.filter(item => item.itemVO.itemId !== itemId);
            }
          })
          .catch(error => {
            // Handle error
          });
    },
    formatCurrency(value) {
      // Format the currency value
      return value; // Implement your currency formatting logic
    },
  }
};
</script>
<style scoped>
@import "@/assets/css/jpetstore.css";
</style>