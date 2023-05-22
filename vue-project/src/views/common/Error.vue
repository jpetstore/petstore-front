<script>
import {defineComponent} from 'vue';
import HeaderComponent from '../common/header.vue';
import FooterComponent from '../common/footer.vue';

export default defineComponent({
    name: "main",
    components:{HeaderComponent,FooterComponent},
    msg: ""
})
</script>

<template>
    <!DOCTYPE html>
    <html lang="en">
        <HeaderComponent/>      <!--导入header-->
            <div>
                <p v-if="msg">错误提示msg</p>
                <p v-if="!msg">{{ msg }}</p>
            </div>
        <FooterComponent/>      <!--导入footer-->
    </html>
</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>