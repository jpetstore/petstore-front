<script>
import HeaderComponent from "@/views/common/header.vue";
import FooterComponent from "@/views/common/footer.vue";
import axios from "axios";
import router from "@/router";
import $ from 'jquery';

export default {
  name: "Signin",
  components : {
    HeaderComponent,
    FooterComponent
  },

  data() {
    return {
      id: '',
      password: '',
      authCode: '',
      captchaImage: '',
      errorMessage: '',
      captchaLinkClicked: false,
      isPhoneLogin: false,
    };
  },
  methods: {
    login() {
      this.errorMessage = '';
      console.log(this.id)
      const data= {
        id: this.id,
        password: this.password,
        authCode: this.authCode,
      }
      console.log(data)
      axios.defaults.withCredentials = true;
      axios
          .post('http://localhost:8090/account/login', {
            id: this.id,
            password: this.password,
            authCode: this.authCode,
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => {
            const data = response.data;
            console.log(data)
            if (data.code === 0) {
              // 登录成功
              // 在这里处理登录成功的逻辑
              console.log('登录成功');
              router.push({name:'main'})
              console.log('登录成功');
            } else {
              // 登录失败
              this.errorMessage = data.msg;
            }
          })
          .catch(error => {
            console.error(error);
            this.errorMessage = '服务器异常';
          });
    },
    loadCaptchaImage() {
      axios
          .get('http://localhost:8090/account/authCode', { responseType: 'arraybuffer' })
          .then(response => {
            const data = response.data;
            this.handleImageData(data)
            console.log("sucess")
          })
          .catch(error => {
            console.error(error);
          });
    },
    handleImageData(imageData) {
      const blob = new Blob([imageData], { type: 'image/jpeg' }); // 根据实际的图片类型进行设置
      this.captchaImage = URL.createObjectURL(blob);
    },
    toggleLoginMethod() {
      this.isPhoneLogin = !this.isPhoneLogin;
    },
    updateCaptcha() {
      this.captchaImage = ''; // 清空验证码图片
      this.captchaLinkClicked = true;
      axios
          .get('http://localhost:8090/account/authCode',{ responseType: 'arraybuffer' })
          .then(response => {
            const data = response.data;
            this.handleImageData(data)
            console.log("sucess")
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
  created() {
    this.loadCaptchaImage();
  },
  computed: {
    captchaImageUrl() {
      if (this.captchaLinkClicked) {
        // 将时间戳作为查询参数，确保每次都是新的链接，强制刷新验证码图片
        return `/account/authCode?t=${Date.now()}`;
      }
      // 默认的验证码图片链接
      return this.captchaImage;
    },
  },
}


$(document).ready(function() {

$('#FGTPSW').hide();
$("#login-box").hide();
$("#shadow").hide();

$('#signinpsw').on("focus", function (){
    $('#FGTPSW').show();
})
$('#signinpsw').on("blur",function (){
    $('#FGTPSW').hide();
})

$("#FGTPSW").mousedown(function () {
  console.log("123");
    $("#login-box").show();
    $("#shadow").show();
});
//关闭登录框，点击关闭按钮关闭
$("#closeLoginBox").click(function () {
    $("#login-box").hide();
    $("#shadow").hide();
});
$('#closeLoginBoxMAIL').click(function (){
    $('#login-box-email').hide();
    $("#shadow").hide();
})

$('#throughEmail').click(function (){
    $('#login-box').hide();
    $('#login-box-email').show();
})

$('#throughPhone').click(function (){
    $('#login-box').show();
    $('#login-box-email').hide();
})



$('#confirmFGTPSWMAIL').click(function (){

    var serializeArray = $("#FGTPSWformMAIL").serializeArray();
    console.log(555);
    $.ajax(
        {

            url     :"http://localhost:8090/account/passwordMSGMAIL",
            type    :"post",
            data    :serializeArray,
            success :function (data){
                alert(data);

                if(data==="新密码已经发送至邮箱，请注意查收"){
                    console.log(data);
                    $("#login-box-email").hide();
                    $("#shadow").hide();
                }
            },
            clearForm:false,
            resetForm:false

        }
    );

});

$('#confirmFGTPSW').click(function (){

    var serializeArray = $("#FGTPSWform").serializeArray();
    console.log(55666);
    $.ajax(
        {

            url     :"http://localhost:8090/account/passwordMSG",
            type    :"post",
            data    :serializeArray,
            success :function (data){
                alert(data);
                console.log(data);
                if(data==="新密码已经发送至手机，请注意查收"){
                    console.log(data);
                    $("#login-box").hide();
                    $("#shadow").hide();
                }
            },
            clearForm:false,
            resetForm:false

        }
    );

});



})
</script>
<template>
  <!DOCTYPE html>
  <html lang="en">
  <HeaderComponent/>
  <ForgetPassword/>

  <div style="display: none" class="shadow" id="shadow"></div>
<div style="display: none" id="login-box" class="login-box">
    <form id="FGTPSWform" >
        <table align="center">


            <tr>
                <td><h3>We will send a new password to you</h3></td>
                <td><h3>Please enter your username and phone number</h3></td>
            </tr>

            <tr>
                <td>Username:</td>
                <td><input type="text" name="username" required="required"></td>

            </tr>



            <tr>
                <td>PhoneNumber:</td>
                <td><input type="text" name="phoneNumber" required="required"></td>
            </tr>


            <tr>
                <td> <input type="button" id="confirmFGTPSW" value="Confirm"></td>
                <td>
                    <input type="button" value="Cancel"  align="right" id="closeLoginBox">
                    <input type="button" value="through email" id="throughEmail">
                </td>
            </tr>


        </table>
    </form>



</div>

<div style="display: none" id="login-box-email" class="login-box">
    <form id="FGTPSWformMAIL" >
        <table align="center">

            <tr>
                <td><h3>We will send a new password to you</h3></td>
                <td><h3>Please enter your username and email</h3></td>
            </tr>

            <tr>
                <td>Username:</td>
                <td><input type="text" name="username" required="required"></td>

            </tr>

            <tr>
                <td>Email:</td>
                <td><input type="text" name="email" required="required"></td>
            </tr>


            <tr>
                <td> <input type="button" id="confirmFGTPSWMAIL" value="Confirm"></td>
                <td>
                    <input type="button" value="Cancel"  align="right" id="closeLoginBoxMAIL">
                    <input type="button" value="through phone" id="throughPhone">
                </td>
            </tr>


        </table>
    </form>

</div>

  <div id="BackLink">
    <a href="/catalog/main">Return to Main Menu</a>
  </div>
  <font color="red" v-if="errorMessage">{{errorMessage}}</font>
  <form @submit.prevent="login" id="signInPasswordForm">
    <div id="Sign" v-if="!isPhoneLogin">
      <table align="center">
        <tr>
          <td>Username:</td>
          <td><input type="text"  required="required" v-model="id"></td>
        </tr>
        <tr>
          <td >Password:</td>
          <td><input type="password" id="signinpsw" required="required" v-model="password"></td>
          <td id="FGTPSW"><a id="FGTPSWmsg"> forget password?</a></td>
        </tr>
        <tr>
          <td> Verification Code:</td>
          <td><input type="text" name="authCode" required v-model="authCode"></td>
        </tr>
        <tr>
          <td> <img id="myImage" name="myImage"  :src="captchaImage"/></td>
          <td>
            <a href="javascript:void(0)" @click="updateCaptcha">unclearly! change the image</a>
          </td>
        </tr>

        <tr>
          <td><input type="submit" value="Signin"></td>
<!--          <td> <input type="button" value="Signin" @click="login"></td>-->
          <td> <input type="button" value="through Phone" @click="toggleLoginMethod"></td>
        </tr>

      </table>
    </div>
  </form>
  <form action="/account/signinPhone" method="post" id="signInPhoneForm">
    <div id="SignPhone" v-if="isPhoneLogin">
      <table align="center">

        <tr>
          <td>Username:</td>
          <td><input type="text" name="id" required="required"></td>

        </tr>

        <tr>
          <td>PhoneNumber:</td>
          <td><input type="text" name="phoneNumber" id="phoneNumber" required="required"></td>

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
          <td> <input type="submit" value="Signin"></td>
          <td> <input type="button" value="through Password" @click="toggleLoginMethod"></td>
        </tr>

      </table>
    </div>
  </form>


  <p align="center">
    Need a username and password?<a href="/account/Register">Register Now!</a>
  </p>
  <FooterComponent/>      <!--导入footer-->
  </html>
</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>