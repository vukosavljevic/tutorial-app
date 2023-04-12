<template>
    <header>
        <ul>
            <h1>Vuk</h1>
            <div class="line"></div>
            <router-link to="/">Homepage</router-link>
            <router-link to="/history">All videos</router-link>
            <div class="line"></div>
            <router-link to="/about">About</router-link>
            <router-link to="/login">Login</router-link>
        </ul>
        <SwitchModeButton></SwitchModeButton>
    </header>
</template>
<script>
import SwitchModeButton from '@/components/Utilities/SwitchModeButton.vue';

export default {
    components : {
        SwitchModeButton
    }
}
</script>
<style scoped>
header {
    width: 20%;
    height: 100vh;
    background-color: #CC2936;
}

a,
h1 {
    color: black;
    margin-left: 2rem;
    display: inline-block;
    position: relative;
}

ul {
    display: flex;
    flex-direction: column;
    font-size: 2rem;
}

.line {
    width: 100%;
    height: 2px;
    background-color: white;
    margin: 2rem 0;
}

a::after {
    content: '';
    position: absolute;
    width: 50%;
    transform: scaleX(0);
    height: 2px;
    top: 110%;
    bottom: 0;
    left: 0;
    background-color: black;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

a:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
ul{
    margin-bottom: 4rem;
}
</style>