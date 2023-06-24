<script>
import {defineComponent} from 'vue';
import axios from 'axios'; // 导入 axios 库（需要先安装）
import router from "@/router";
import $ from 'jquery';

export default defineComponent({
    name: "header",
    data() {
        return {
            session: null,
            isLogin: false,
            form: {
                keyword: ""
            },
            allCategoryLists: "",
            userInfo :   [],
            signIn: " Sign In ",
            username: ""
        };
    },
    // 在组件创建时发送请求获取数据
    created() {
            this.fetchData();
    },
    methods: {
        login() {
            this.isLogin=true;
        },
        fetchData() {
            // 发送请求到后端获取数据，判断登录是否成功，如果成功，将isLogin赋值为true，并传输username
            axios.get('http://localhost:8090/account/get_loginUser_info')
                .then(response => {
                    this.userInfo = response.data;
                    if(this.userInfo.status == 0){
                        this.isLogin = true;
                        console.log(this.isLogin+"!!!");
                    }
                    // 请求成功，处理后端返回的数据
                    this.username = response.data.data.id;
                })
                .catch(error => {
                    // 请求失败，处理错误
                    console.error(error);
                });
        },
        signOut(){
            axios.get('http://localhost:8090/account/signout')
                .then(response => {
                    this.msg = response.msg;
                    this.isLogin = false;
                })
                .catch(error => {
                    // 请求失败，处理错误
                    console.error(error);
                });
        },
        submitSearch(event) {
            axios.defaults.withCredentials = true;
            // event.preventDefault();
            // 发送请求到后端传输数据，并将表单信息（form.product）传输给后端
            axios
            .post('http://localhost:8090/catalog/search', {
                keyword: this.form.keyword
            },{
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(response => {
                // 请求成功处理
                // 跳转到第二个界面，传递搜索结果
                console.log(response.data);
                this.$router.push({
                    path: '/catalog/searchProduct',
                    query: { products: JSON.stringify(response.data) }
                });
            })
            .catch(error => {
                // 请求失败处理
                console.error(error);
            });
        },
    },
    computed:{
        refreshPage() {
            return window.location.href; // 刷新当前页面
        }
    }
})

</script>

<template>
<head>
    <meta charset="UTF-8">
    <title>MyPetStore</title>
    <link rel="stylesheet" href="../../assets/css/jpetstore.css" type="text/css">
    <link href="../../assets/css/jquery-ui.min.css" rel="StyleSheet"  type="text/css"/>

    <meta name="generator"
          content="HTML Tidy for Linux/x86 (vers 1st November 2002), see www.w3.org" />
    <title>MyPetStore Demo</title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta http-equiv="Cache-Control" content="max-age=0" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="Expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="Pragma" content="no-cache" />
</head>

<body>
<header>
    <div id="Header">

        <div id="Logo">
            <div id="LogoContent">
                <a href="/catalog/main"><img src="../../assets/images/logo-topbar.gif"/></a>
            </div>
        </div>

        <div id="Menu" >
            <div id="MenuContent" >

                <a href="/cart/viewCart"><img align="middle" name="img_cart" src="../../assets/images/cart.gif" />&nbsp;</a>
                
                <img align="middle" src="../../assets/images/separator.gif" />

                <!-- 如果没登陆，显示Sign In按钮 -->
                <a id="signin" href="/account/Signin" v-if="!isLogin"> Sign In </a>
                <!-- 如果登陆了，显示Sign Out按钮 -->
                <a id="signout" href="/catalog/main" v-if="isLogin" @click="signOut"> Sign Out </a>

                <img align="middle" src="../../assets/images/separator.gif" />

                <a href="/account/MyAccount"> My Account </a>

                <img align="middle" src="../../assets/images/separator.gif" />

                <a :href="refreshPage"> Refresh </a>

                <img align="middle" src="../../assets/images/separator.gif" />

            </div>
        </div>


        <div id="Search">
            <div id="SearchContent">
                <!-- 将submit按钮点击事件设置好 -->
                <form>
                    <input id="searchbar" type="text" v-model="form.keyword" size="14"/>
                    <input type="button" name="searchProducts" value="Search" @click="submitSearch"/>
                    <font color="black" v-if="isLogin && username!=null">用户名：{{ username }}</font>
                    <font color="black" v-if="!isLogin && !username">未登录</font>
                </form>
            </div>
        </div>


        <div id="QuickLinks">
            <img src="../../assets/images/separator.gif"/>
            <span>
                <a href="/catalog/BIRDS"> BIRDS </a>
                <img src="../../assets/images/separator.gif"/>
            </span>
            <span>
                <a href="/catalog/CATS"> CATS </a>
                <img src="../../assets/images/separator.gif"/>
            </span>
            <span>
                <a href="/catalog/DOGS"> DOGS </a>
                <img src="../../assets/images/separator.gif"/>
            </span>
            <span>
                <a href="/catalog/FISH"> FISH </a>
                <img src="../../assets/images/separator.gif"/>
            </span>
            <span>
                <a href="/catalog/REPTILES"> REPTILES </a>
                <img src="../../assets/images/separator.gif"/>
            </span>
            <!-- <a v-if="allCategoryLists.size == 0">No Categor</a>
            <span v-if="allCategoryLists.size > 0" >
                <span v-for="category in allCategoryLists">
                    <a v-bind:href="`/catalog/viewCategory/${category.id}`">{{ category.id }}</a>
                    <img src="../../assets/images/separator.gif"/>
                </span>
                <img src="../../assets/images/separator.gif"/>
            </span> -->
        </div>

    </div>
    
</header>
</body>

</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>


