<template>
    <div class="outer--wrapper">
        <div class="login--backdrop" @click="addPost"></div>
        <div class="wrapper--form">
            <form @submit.prevent="submitForm">
                <h1>Uplaod a new post!</h1>
                <input type="text" placeholder="Naslov" v-model="video.title">
                <input type="text" placeholder="Description" v-model="video.description">
                <label for="videoFile">Select a video src:</label>
                <input type="text" placeholder="Src" v-model="video.src">
                <button>Submit</button>
                <p>Click anywhere to leave the new post page!</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            video: {
                title: '',
                description: '',
                src: ''
            },
        }
    },
    methods: {
        submitForm() {
            this.title = this.video.title;
            this.description = this.video.description;
            this.file = this.video.src;
            axios.post('http://localhost:8080/tutorials', {
                title: this.title,
                description: this.description,
                file: this.file,
                author: this.currentUser.name
            })
            this.$store.commit('addPost');
        },
         addPost() {
            this.$store.commit('addPost')
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    }
}
</script>

<style scoped>
.outer--wrapper {
    text-align: center;
    display: flex;
    position: relative;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 20;
    color: white;
}
.wrapper--form{
    width: 40%;
    z-index: 100;
    margin:auto;
}
.login--backdrop {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    opacity: 0.5;
    cursor: pointer;
}

button {
    background-color: white;
}

form {
    display: flex;
    flex-direction: column;
    padding: 12rem;
}

input {
    padding: 1rem;
    width: 100%;
}
</style>