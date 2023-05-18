<template>
  <main class="main" :class="{ notmain: switchedState, noscroll: showLogin}">
    <the-header></the-header>
    <login-page v-if="showLogin"></login-page>
    <add-post v-if="postState"></add-post>
    <base-wrapper>
      <router-view></router-view>
    </base-wrapper>
  </main>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';
import LoginPage from './components/Pages/LoginPage.vue';
import AddPost from './components/Utilities/AddPost.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    TheHeader,
    LoginPage,
    AddPost
  },
  computed: {
        ...mapGetters(['switchedState','showLogin','postState'])
    }
}
</script>

<style>
body{
  overflow-x: hidden;
  background-color: rgb(199 196 196);
}
@font-face {
  font-family: "Open-sans";
  src: url(./assets/fonts/OpenSans-Bold.ttf);
}
*,*::after,*::before{
  margin:0;
  padding:0;
}
*:focus {
    outline: none;
}
.main {
  font-family: "Open-sans";
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.noscroll{
  overflow:hidden;
}
span{
    background:linear-gradient(315deg,#42d392 25%,#647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent
} 
a {
  color:black;
  text-decoration: none;
  margin:1rem 0;
}
main{
  display: flex;
}
.tutorial--wrapper {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
    padding: 0 8vw;
    margin-bottom: 2rem;
}

button{
    background: transparent;
    outline: none;
    width: 20%;
    font-size:1.5rem;
    color:black;
    cursor: pointer;
    border: none;
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: 400;
    border:1px solid #42d392;   
}
</style>