<script>
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import axios from "axios";


export default {
    name: "MyAccount",
    components:{HeaderComponent,FooterComponent},
    data(){
        return{
            userInfo :   [],
            reminder: undefined
        };
    },
    async created(){
        console.log('created');
        const re = await this.fetchData();//promise对象
        console.log(re);
        this.reminder=re.msg;
        this.userInfo = re.data;
    },
    methods:{
         submitForm(event) {
        event.preventDefault();
        let userInfo = {
            password    :   this.userInfo.password,
            firstname   :   this.userInfo.firstname,
            lastname    :   this.userInfo.lastname,
            email       :   this.userInfo.email,
            phone       :   this.userInfo.phone,
            address1       :   this.userInfo.address1,
            address2       :   this.userInfo.address2,
            city        :   this.userInfo.city,
            state       :   this.userInfo.state,
            zip         :   this.userInfo.zip,
            country     :   this.userInfo.country,
            languagepre :   this.userInfo.languagepre
            
        }
        console.log(userInfo)
        axios.post('http://localhost:8090/account/editAccount',userInfo,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response=>{
                if(response.data.status == 0){
                    // router.push('/catalog/main')
                    this.$router.push('/account/MyAccount')
                    console.log("change successfully")
                }else{
                    // this.$router.push('/account/register')
                    this.$router.push('/account/MyAccount')
                    console.log("fail change")
                }
            })
            .catch(error=>{
            //    router.push('/catalog/main');
            })
        },
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

<font color="red" v-model="reminder"></font>

<form action="http://localhost:8090/account/editAccount" @submit="submitForm" method="post">
    <table>
        <tr>
            <td> <h3 align="center">User Information</h3></td>
        </tr>
        <tr>
            <td>
                Username:
            </td>
            <td >
                <input type="text" name="username" id="username" readonly="readonly" v-model="userInfo.id">
            </td>
        </tr>
        <tr>
            <td>
                New Password:
            </td>
            <td >
                <input type="password" name="password" id="password" v-model="userInfo.password">
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
                <input type="text" name="firstname" id="firstname" v-model="userInfo.firstname">
            </td>
        </tr>
        <tr>
            <td>
                Last Name:
            </td>
            <td >
                <input type="text" name="lastname" id="lastname" v-model="userInfo.lastname">
            </td>
        </tr>
        <tr>
            <td>
                Email:
            </td>
            <td >
                <input type="email" name="email" id="email" v-model="userInfo.email">
            </td>
        </tr>
        <tr>
            <td>
                Phone:
            </td>
            <td >
                <input type="text" name="phone" id="phone" v-model="userInfo.phone">
            </td>
        </tr>
        <tr>
            <td>
                Address1:
            </td>
            <td >
                <input type="text" name="address1" id="address1" v-model="userInfo.address1">
            </td>
        </tr>
        <tr>
            <td>
                Address2:
            </td>
            <td >
                <input type="text" name="address2" id="address2" v-model="userInfo.address2">
            </td>
        </tr>
        <tr>
            <td>
                City:
            </td>
            <td >
                <input type="text" name="city" id="city" v-model="userInfo.city">
            </td>
        </tr>
        <tr>
            <td>
                Stste:
            </td>
            <td >
                <input type="text" name="state" id="state" v-model="userInfo.state">
            </td>
        </tr>
        <tr>
            <td>
                Zip:
            </td>
            <td >
                <input type="text" name="zip" id="zip" v-model="userInfo.zip">
            </td>
        </tr>
        <tr>
            <td>
                Country:
            </td>
            <td >
                <input type="text" name="country" id="country" v-model="userInfo.country">
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
                <select name="languagepre"  v-if="userInfo.languagepre==='English'">
                    <option selected="selected" value="English">English</option>-->
                    <option value="Janpenese">Janpenese</option>-->
                </select>
                <select name="languagepre" v-if="userInfo.languagepre==='Janpenese'">
                    <option value="English">English</option>
                    <option selected="selected" value="Janpenese">Janpenese</option>
                </select>
                <select name="languagepre" v-if="!(userInfo.languagepre==='English'||userInfo.languagepre==='Janpenese')">
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