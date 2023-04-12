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
*,*::after,*::before{
  margin:0;
  padding:0;
}
body {
  background-color: #08415C;
  font-family: "Open-sans";
}

a {
  text-decoration: none;
  margin-top:1rem;
  display: inline-block;
  position: relative;
  color: #0087ca;
}
main{
  display: flex;
}
h1{
  margin-top:2rem;
}
a:hover{

}
</style>