<script>
import {defineComponent} from 'vue';
import HeaderComponent from "../common/header.vue"
import FooterComponent from "../common/footer.vue"

export default defineComponent({
    name: "Main",
    components:{HeaderComponent, FooterComponent}
})
</script>

<template>
    <HeaderComponent />
    <html lang="en">
        <body>
        <div id="Welcome">
        <div id="WelcomeContent">
        Welcome to MyPetStore!
        </div>
    </div>

<div id="Main">
    <div id="Sidebar">
        <div id="SidebarContent">
            <a href="/catalog/FISH"><img src="../../assets/images/banner_fish.gif" /></a>
            <br/> Saltwater, Freshwater <br/>
            <a href="/catalog/DOGS"><img src="../../assets/images/banner_dogs.gif" /></a>
            <br /> Various Breeds <br />
            <a href="/catalog/CATS" ><img src="../../assets/images/banner_cats.gif" /></a>
            <br /> Various Breeds, Exotic Varieties <br />
            <a href="/catalog/REPTILES"><img src="../../assets/images/banner_reptiles.gif" /></a>
            <br /> Lizards, Turtles, Snakes <br />
            <a href="/catalog/BIRDS"><img src="../../assets/images/banner_birds.gif" /></a>
            <br /> Exotic Varieties
        </div>
    </div>


   <div id="tooltip" class="tip"></div>

    <div id="tooltip"></div>

    <!--    =============================================================================-->
       <!-- 方便测试用-->
    <!-- <div id="fast_signin">
        <a type="button" href="/account/fastSignin" th:if="${session.user}==null">Click here to fast signin</a>
    </div> -->
    <!--    =============================================================================-->


    <div id="MainImage">
        <div id="MainImageContent">
            <map name="estoremap">
                <area alt="Birds" id = "Birdspic" coords="72,2,280,250" href="/catalog/BIRDS" shape="rect" />
                <area alt="Fish" id = "Fishpic" coords="2,180,72,250" href="/catalog/FISH" shape="rect" />
                <area alt="Dogs" id = "Dogspic" coords="60,250,130,320" href="/catalog/DOGS" shape="rect" />
                <area alt="Reptiles" id = "Reptilespic" coords="140,270,210,340" href="/catalog/REPTILES" shape="rect" />
                <area alt="Cats" id = "Catspic" coords="225,240,295,310" href="/catalog/CATS" shape="rect" />
                <area alt="Birds" id = "Birds2pic" coords="280,180,350,250" href="/catalog/BIRDS" shape="rect" />
            </map>
            <img height="355" src="../../assets/images/splash.gif" align="middle" usemap="#estoremap" width="350" />
        </div>
    </div>
    <div id="Separator">&nbsp;</div>
    </div>
    </body>
    </html>
    
    
<FooterComponent />
</template>

<style scoped>
  @import "../../assets/css/jpetstore.css";
</style>