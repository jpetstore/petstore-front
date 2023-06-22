<script>
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";


export default {
    name: "MyAccount",
    components:{HeaderComponent,FooterComponent},
    data(){
        return{
            user :   []
        };
    },
    async created(){
        console.log('created');
        const re = await this.fetchData();//promise对象
        console.log(re);
        this.user = re.data;
    },
    methods:{
        async fetchData(){
            console.log()
            try{
                axios.defaults.withCredentials = true;
                const response = await axios.get('http://localhost:8090/account/get_loginUser_info');
                // console.log(response)
                // console.log(response.data)
                return response.data;
            }catch(error){
                console.log(error);
                return 0;
            }
        }
    }
}



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
                <input type="text" name="username" id="username" readonly="readonly" v-model="user.id">
            </td>
        </tr>
        <tr>
            <td>
                New Password:
            </td>
            <td >
                <input type="password" name="password" id="password" v-model="user.password">
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
                <input type="text" name="firstname" id="firstname" v-model="user.firstname">
            </td>
        </tr>
        <tr>
            <td>
                Last Name:
            </td>
            <td >
                <input type="text" name="lastname" id="lastname" v-model="user.lastname">
            </td>
        </tr>
        <tr>
            <td>
                Email:
            </td>
            <td >
                <input type="email" name="email" id="email" v-model="user.email">
            </td>
        </tr>
        <tr>
            <td>
                Phone:
            </td>
            <td >
                <input type="text" name="phone" id="phone" v-model="user.phone">
            </td>
        </tr>
        <tr>
            <td>
                Address1:
            </td>
            <td >
                <input type="text" name="address1" id="address1" v-model="user.address1">
            </td>
        </tr>
        <tr>
            <td>
                Address2:
            </td>
            <td >
                <input type="text" name="address2" id="address2" v-model="user.address2">
            </td>
        </tr>
        <tr>
            <td>
                City:
            </td>
            <td >
                <input type="text" name="city" id="city" v-model="user.city">
            </td>
        </tr>
        <tr>
            <td>
                Stste:
            </td>
            <td >
                <input type="text" name="state" id="state" v-model="user.state">
            </td>
        </tr>
        <tr>
            <td>
                Zip:
            </td>
            <td >
                <input type="text" name="zip" id="zip" v-model="user.zip">
            </td>
        </tr>
        <tr>
            <td>
                Country:
            </td>
            <td >
                <input type="text" name="country" id="country" v-model="user.country">
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
                <select name="languagepre"  v-if="user.languagepre==='English'">
                    <option selected="selected" value="English">English</option>-->
                    <option value="Janpenese">Janpenese</option>-->
                </select>
                <select name="languagepre" v-if="user.languagepre==='Janpenese'">
                    <option value="English">English</option>
                    <option selected="selected" value="Janpenese">Janpenese</option>
                </select>
                <select name="languagepre" v-if="!(user.languagepre==='English'||user.languagepre==='Janpenese')">
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
<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>