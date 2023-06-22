<script>
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import $ from 'jquery';
import axios from 'axios';

// let phoneVcode = ""
// let authCode = ""

$(document).ready(function(){

$('#iEI').hide();

$('#username').on('blur',function (){

    $.ajax({
        type    :"GET",
        url     :"http://localhost:8090/account/idIsExist?id="+$('#username').val(),
        success :function(data){

            $('#iEI').show();

            if(data === "Empty"){
                $('#iEI').hide();
            }else if(data === "Not Exist"){
                $('#isExistInfo').attr("class","oktips").text('用户名可用');
            }else if(data === "Exist"){
                $('#isExistInfo').attr("class","errortips").text('用户名不可用');

            }
        },
        error :function (){
            window.alert('data');
        }
    });

});



$('#phoneCode').off("click"); //解除绑定点击事件

$('#phoneCode').unbind("click");//移除绑定点击事件

$('#phoneCode').unbind(); //移除所有绑定事件

$('#phoneCode').on("click",function (){
    var p = $('#phone').val();
    console.log(p);
    axios.post("http://localhost:8090/account/phoneVCode?phone=" + p)
        .then(response => {
            console.log(response.data);
            phoneVcode = response.data.msg
        })
        .catch(error => {
            console.error(error);
        });
});



});


export default {
    name: "Register",
    components:{ HeaderComponent, FooterComponent},
    data(){
        return{
            userInfo    :   {
                            id          :   "",
                            password    :   "",
                            firstname   :   "",
                            lastname    :   "",
                            email       :   "",
                            phone       :   "",
                            addr1       :   "",
                            addr2       :   "",
                            city        :   "",
                            state       :   "",
                            zip         :   "",
                            country     :   "",
                            status      :   "",
                            
                        }
        };
    },
    async created(){
        console.log('Create')
        // const imgEl = document.getElementById('myImage')
        // console.log(imgEl.id)
        // imgEl.src =  (await axios.get('http://localhost:8090/account/authCode')).data;
    },
    methods:{
    submitForm(event) {
        event.preventDefault();
        // authCode = (await axios.post("http://localhost:8090/account/getAuthCode")).data.msg
        // console.log(authCode)
        let userInfo = {
            id          :   this.userInfo.id,
            password    :   this.userInfo.password,
            firstname   :   this.userInfo.firstname,
            lastname    :   this.userInfo.lastname,
            email       :   this.userInfo.email,
            phone       :   this.userInfo.phone,
            addr1       :   this.userInfo.addr1,
            addr2       :   this.userInfo.addr2,
            city        :   this.userInfo.city,
            state       :   this.userInfo.state,
            zip         :   this.userInfo.zip,
            country     :   this.userInfo.country,
            status      :   this.userInfo.status,
            
        }
        console.log(userInfo)
        axios.post('http://localhost:8090/account/register',userInfo,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response=>{
                if(response.data.status == 0){
                    // router.push('/catalog/main')
                    this.$router.push('/catalog/main')
                    console.log("register successfully")
                }else{
                    // this.$router.push('/account/register')
                    this.$router.push('/catalog/main')
                    console.log("fail register")
                }
            })
            .catch(error=>{
            //    router.push('/catalog/main');
            })
        },
        // myReload(){
        //     $('#myImage').src = axios.get('http://localhost/account/authCode')
        //     axios.get('http://localhost/account/getAuthCode')
        //         .then(response => {
        //             authCode = response.data.msg
        //         })
        // }
    }
}
</script>

<style>
    .okTips{
        color : green;
    }
    .errorTips{
        color : red;
    }
</style>

<template>

<HeaderComponent/>      <!--导入header-->



<div id="BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
</div>

<form @submit="submitForm" method="post">
    <h1 align="center">User Information</h1>
    <table align="center">

        <tr>
            <td>Username:</td>
            <td>
                <input type="text" id="id" name = "id" v-model="userInfo.id" required>
            </td>

            <td id = "iEI"> <span id="isExistInfo"></span></td>
        </tr>


        <tr>
            <td> Password:  </td>
            <td><input type="password" name="password" v-model="userInfo.password" required>
            </td>
        </tr>

        <tr>
            <td>
                Repeat Password:
            </td>
            <td >
                <input type="password" name="repeatpwd" id="repeatpwd" >
            </td>
        </tr>


        <tr>
            <td>
                Phone:
            </td>
            <td >
                <input type="text" name="phone" id="phone" v-model="userInfo.phone" required>
            </td>
        </tr>





        <tr>
            <td>
                <input type="button" id="phoneCode" value="Send phoneCode">
            </td>
            <td>
                <input type="text" id="phoneVCode" name="inputVCode" value="">
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
                Address1:
            </td>
            <td >
                <input type="text" name="address1" id="address1" v-model="userInfo.addr1">
            </td>
        </tr>
        <tr>
            <td>
                Address2:
            </td>
            <td >
                <input type="text" name="address2" id="address2" v-model="userInfo.addr2">
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
                State:
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
            <td> Language Preference: </td>
            <td>
                <select name="languagepre">
                    <option value="English">English</option>
                    <option value="Janpenese">Janpenese</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </td>
        </tr>


        <tr>
            <td> Verification Code:</td>
            <td><input type="text" name="inputCode" required></td>
        </tr>
        <tr>
            <td> <img id="myImage" name="myImage" src="http://localhost:8090/account/authCode"></td>
            <td><a href="javascript:void(0)" @click="myReload">uncleary!change the image</a></td>
        </tr>


        <tr>
            <td > <font color="red" v-model="reminder"></font></td>
        </tr>
        <tr>
            <td><input type="submit" value="Save"></td>

        </tr>
    </table>
</form>

<FooterComponent/> 
</template>
<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>