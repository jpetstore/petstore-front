<script>

export default {
    name: "ForgetPassword",
    data(){
        return{
            user :   []
        };
    },
    async created(){
        console.log('created');
        const re = await this.fetchData();//promise对象
        this.user = re.data;
    },
    methods:{
        async fetchData(){
            console.log()
            try{
                const response = await axios.get('http://localhost:8090/account/editAccount');
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
                    <input type="button" value="through email" id="throughPhone">
                </td>
            </tr>


        </table>
    </form>



</div>

</template>

<script>
//忘记密码
import $ from "../jquery"

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

        $.ajax(
            {

                url     :"/account/passwordMSGMAIL",
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

        $.ajax(
            {

                url     :"/account/passwordMSG",
                type    :"post",
                data    :serializeArray,
                success :function (data){
                    alert(data);

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