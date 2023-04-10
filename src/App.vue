<template>
  <main>
    <the-header></the-header>
    <base-wrapper>
      <router-view></router-view>
    </base-wrapper>
  </main>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';

export default {
  components: {
    TheHeader
  }
}
</script>

<style>
@font-face {
  font-family: "Open-sans";
  src: url(./assets/fonts/OpenSans-Bold.ttf);
}
body {
  background-color: #08415C;
  font-family: "Open-sans";
}

a {
  text-decoration: none;
}

ul {
  list-style-type: none;
}
main{
  display: flex;
}
</style>
