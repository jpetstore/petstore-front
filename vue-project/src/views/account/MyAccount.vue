
<script>
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';

export default defineComponent({
    name: "MyAccount",
    components:{HeaderComponent,FooterComponent}
})



</script>
<template>

<HeaderComponent/>      <!--导入header-->
<div id="BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
</div>

<div id="BackLink">
    <a href="/account/allOrders">View All Orders</a>
</div>

<font color="red" text="message">错误提示message</font>

<form action="/account/saveAccount" method="post">
    <table>
        <tr>
            <td> <h3 align="center">User Information</h3></td>
        </tr>
        <tr>
            <td>
                Username:
            </td>
            <td >
                <input type="text" name="username" id="username" readonly="readonly" value="user.username">
            </td>
        </tr>
        <tr>
            <td>
                New Password:
            </td>
            <td >
                <input type="password" name="password" id="password" value="user.password">
            </td>
        </tr>
        <tr>
            <td>
                <h3 align="center">Account Information</h3>
            </td>
        </tr>
        <tr>
            <td>
                First Name:
            </td>
            <td >
                <input type="text" name="firstname" id="firstname" value="user.firstname">
            </td>
        </tr>
        <tr>
            <td>
                Last Name:
            </td>
            <td >
                <input type="text" name="lastname" id="lastname" value="user.lastname">
            </td>
        </tr>
        <tr>
            <td>
                Email:
            </td>
            <td >
                <input type="email" name="email" id="email" value="user.email">
            </td>
        </tr>
        <tr>
            <td>
                Phone:
            </td>
            <td >
                <input type="text" name="phone" id="phone" value="user.phone">
            </td>
        </tr>
        <tr>
            <td>
                Address1:
            </td>
            <td >
                <input type="text" name="address1" id="address1" value="user.address1">
            </td>
        </tr>
        <tr>
            <td>
                Address2:
            </td>
            <td >
                <input type="text" name="address2" id="address2" value="user.address2">
            </td>
        </tr>
        <tr>
            <td>
                City:
            </td>
            <td >
                <input type="text" name="city" id="city" value="{{user.city}}">
            </td>
        </tr>
        <tr>
            <td>
                Stste:
            </td>
            <td >
                <input type="text" name="state" id="state" value="user.state">
            </td>
        </tr>
        <tr>
            <td>
                Zip:
            </td>
            <td >
                <input type="text" name="zip" id="zip" value="{{user.zip}}">
            </td>
        </tr>
        <tr>
            <td>
                Country:
            </td>
            <td >
                <input type="text" name="country" id="country" value="user.country">
            </td>
        </tr>
        <tr>
            <td>
                <h3 align="center">Profile Information</h3>
            </td>
        </tr>
        <tr>
            <td>
                Language Preference:
            </td>
            <td>
                <select name="languagepre"  v-if="user.languagepre.equals('English')">
                    <option selected="selected" value="English">English</option>-->
                    <option value="Janpenese">Janpenese</option>-->
                </select>
                <select name="languagepre" v-if="user.languagepre.equals('Janpenese')">
                    <option value="English">English</option>
                    <option selected="selected" value="Janpenese">Janpenese</option>
                </select>
                <select name="languagepre" v-if="!(user.languagepre.equals('English')||user.languagepre.equals('Janpenese'))">
                    <option value="English">English</option>
                    <option selected="selected" value="Janpenese">Janpenese</option>
                </select>
            </td>
        </tr>
    </table>
    <p align="center">
        <input name="editAccount" type="submit" value="Save Account Information">
    </p>


</form>

<FooterComponent/> 
</template>