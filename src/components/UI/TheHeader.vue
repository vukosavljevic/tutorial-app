<template>
    <header>
        <div class="header--icons">
            <a href="#">
                <img src="@/assets/25231.png" alt="Github icon">
            </a>
            <a href="#">
                <img src="@/assets/1384014.png" alt="Linkedin icon">
            </a>
            <a href="#">
                <img src="@/assets/87390.png" alt="Instagram icon">
            </a>
        </div>
        <ul>
            <router-link to="/">Homepage</router-link>
            <router-link to="/history">All videos</router-link>
            <router-link to="/coaches">Find people</router-link>
        </ul>
        <div class="logged--status">
            <button @click="showLogin" v-if="!loggedState">Login</button>
            <router-link to="/myprofile" class="user--content" v-if="loggedState">
                <img class="user--icon" :src="profilePicState" alt="novosti" />
                {{ currentUser.name
                }}</router-link>
            <button v-if="loggedState" @click="addPost">
                <img src="@/assets/7353967.png" alt="Plus icon" class="user--icon padding">
                New Post
            </button>
            <router-link to="/" v-if="loggedState" @click="logout">Logout</router-link>
        </div>
    </header>
</template>
<script>

import { mapGetters } from 'vuex';
export default {
    methods: {
        logout() {
            this.$store.commit('switchLoggedState')
        },
        showLogin() {
            this.$store.commit('showLoginPage');
        },
        addPost() {
            this.$store.commit('addPost')
        }
    },
    computed: {
        ...mapGetters(['loggedState', 'currentUser','profilePicState']),
    },
}
</script>
<style scoped>
button {
    display: flex;
    width: 100%;
}

.profile--content {
    display: flex;
    align-items: center;
    width: 100%;
}

.user--content {
    margin-left: 0 !important;
}

.user--icon:nth-child(1) {
    width: 42px;
    height: 42px;
    border-radius: 50px;
    margin-right: 0.4rem;
}

.header--icons {
    display: flex;
}

.logged--status {
    display: flex;
    align-items: center;
    justify-content: space-between;

}

img {
    width: 44px;
    height: 44px;
}

header {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
}

button {
    border: none !important;
}

a,
h1,
button {
    color: black;
    margin-left: 2rem;
    display: inline-block;
    position: relative;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}

ul {
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
}

a::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    top: 100%;
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

ul {
    height: 100%;
    background-color: rgb(199 196 196);
}
</style>