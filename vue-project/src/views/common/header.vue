<script>
import {defineComponent} from 'vue';
import axios from 'axios'; // 导入 axios 库（需要先安装）

export default defineComponent({
    name: "header",
    data() {
        return {
            isLogin: false,
            form: {
                // 表单搜索的内容，初始值赋值为空
                product: ""
            },
            allCategoryLists: ""
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
            axios.get('/api/login')
                .then(response => {
                    // 请求成功，处理后端返回的数据
                    this.isLogin = response.data.isLogin;
                    this.username = response.data.username;
                })
                .catch(error => {
                    // 请求失败，处理错误
                    console.error(error);
                });
        },
        submitSearch() {
            // 发送请求到后端传输数据，并将表单信息（form.product）传输给后端
            axios.post('/api/search', this.form)
                .then(response => {
                // 请求成功处理
                // 跳转到第二个界面，传递搜索结果
                    this.$router.push({
                    name: '/catalog/SearchProduct',
                    params: { products: response.data }
                    });
                })
                .catch(error => {
                // 请求失败处理
                console.error(error);
            });
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

                <a href="/cart/viewCart"><img align="middle" name="img_cart" src="../../assets/images/cart.gif" /></a>

                <img align="middle" src="../../assets/images/separator.gif" />

                <!-- 如果没登陆，显示Sign In按钮 -->
                <a id="signin" href="/account/viewSignin" v-if="!isLogin">Sign In</a>

                <!-- 如果登陆了，显示Sign Out按钮 -->
                <a id="signout" href="/account/signout" v-if="isLogin">Sign Out </a>

                <img align="middle" src="../../assets/images/separator.gif" />

                <a href="/account/viewMyAccount">My Account</a>

                <img align="middle" src="../../assets/images/separator.gif" />

                <a href="/account/refresh">Refresh</a>

                <img align="middle" src="../../assets/images/separator.gif" />

            </div>
        </div>


        <div id="Search">
            <div id="SearchContent">
                <!-- 将submit按钮点击事件设置好 -->
                <form @submit="submitSearch">
                    <input type="text" v-model="form.product" size="14"/>
                    <input type="submit" name="searchProducts" value="Search"/>
                    <font color="black" v-if="!isLogin && username">{{ username }}未登录</font>
                    <font color="black" v-if="!isLogin && !username">未登录</font>
                </form>
            </div>
        </div>


        <div id="QuickLinks">
            <img src="../../assets/images/separator.gif"/>
            <img src="../../assets/images/separator.gif"/>
            <a v-if="allCategoryLists.size == 0">No Categor</a>
            <span v-if="allCategoryLists.size > 0" >
                <span v-for="category in allCategoryLists">
                    <a v-bind:href="`/catalog/viewCategory/${category.id}`">{{ category.id }}</a>
                    <img src="../../assets/images/separator.gif"/>
                </span>
                <img src="../../assets/images/separator.gif"/>
            </span>
        </div>

    </div>
    
</header>
</body>

</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>


