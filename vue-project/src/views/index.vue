<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "index"
})

</script>

<template>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JPetStore商城</title>
</head>
<body>
<div id="Content">
    <h2>Welcome to MyPetStore </h2>

    <p><router-link :to="{name:'Main'}">Enter the petstore</router-link></p>

    <p><sub>Copyright Central South University </sub></p>

</div>
</body>
</html>
</template>

<style scoped>
  @import "@/assets/css/jpetstore.css";
</style>