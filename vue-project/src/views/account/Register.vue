<script>
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';
import $ from 'jquery';
import axios from 'axios';

let phoneVcode = undefined
let authCode = undefined
let bool_phoneVcode = false
let bool_authCode = false

$(document).ready(function(){

  axios.defaults.withCredentials = true;

  $("#phoneVCodeWarning").hide();

  $('#authCodeWarning').hide();

  $('#inputCode').on('blur',async function(){
    let re = (await axios.get('http://localhost:8090/account/getAuthCode')).data
    console.log(re)
    if(re.status == 0){
      authCode = re.msg
    }
    console.log("authcode:" + authCode)
    var code = $('#inputCode').val();
    console.log("AcCode:" + code);
    if(code != authCode){
      $('#authCodeWarning').show();
      bool_authCode = false
    }else{
      $('#authCodeWarning').hide();
      bool_authCode = true
    }
  })


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

  $('#phoneCode').on("click",async function (){
    phoneVcode = undefined
    $('#phoneVCode').on('blur',function(){
      console.log(phoneVcode);
      if($('#phoneVCode').val() != phoneVcode){
        $('#phoneVCodeWarning').show();
        bool_phoneVcode = false
      }else{
        $('#phoneVCodeWarning').hide();
        bool_phoneVcode = true
      }
    })
    var p = $('#phone').val();
    console.log(p);
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8090/account/phoneVCode?phone=" + p)
        .then(async function(response) {
          if(response.data.status == 0){
            console.log(response)
            axios.defaults.withCredentials = true;
            phoneVcode = (await axios.get("http://localhost:8090/account/getPhoneCode")).data.data;
            // console.log((await axios.get("http://localhost:8090/account/getPhoneCode")).data.data)
          }
          else {
            alert(response.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
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
  created(){
    console.log('Create')

  },
  mounted(){
    $('#myImage').attr('src','http://localhost:8090/account/authCode')
  },
  methods:{
    async submitForm(event) {
      event.preventDefault();
      if(bool_authCode == true && bool_phoneVcode == true){
        axios.defaults.withCredentials = true;
        // console.log(await axios.get("http://localhost:8090/account/getAuthCode"));
        // authCode = (await axios.get("http://localhost:8090/account/getAuthCode")).data.msg
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
        axios.defaults.withCredentials = true;
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
              console.log(error)
            })
      }
      else {
        alert("验证码有误！\n请检查验证码！")
      }

    },
    myReload(){
      $("#myImage").attr("src","http://localhost:8090/account/authCode");
      authCode = undefined
    }
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
          <input type="text" id="phoneVCode" name="inputVCode" value=""><font id="phoneVCodeWarning" color="#FF0000">手机验证码错误</font>
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
        <td><input type="text"  id="inputCode" name="inputCode" required></td>
        <td><font id="authCodeWarning" color="#FF0000">验证码错误</font></td>
      </tr>
      <tr>
        <td> <img alt="Base64 encoded image" id="myImage" name="myImage"></td>
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