<template>
    <div>
        <div class="form" v-if="!loggedStatus">
            <h1>Hello, admin!</h1>
            <form @submit.prevent="logIn">
                <input type="text" placeholder="Ime" v-model="unesenoIme">
                <input type="text" placeholder="Lozinka" v-model="unesenaLozinka">
                <button>Log In</button>
            </form>
        </div>
        <div v-if="loggedStatus">
            <form @submit.prevent="submitForm">
                <input type="text" placeholder="Naslov" v-model="video.title">
                <input type="text" placeholder="Description" v-model="video.description">
                <label for="videoFile">Select a video src:</label>
                <input type="text" placeholder="Src" v-model="video.src">
                <button>Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            ime: '',
            lozinka: '',
            unesenoIme: '',
            unesenaLozinka: '',
            video: {
                title: '',
                description: '',
                src: ''
            },
            loggedStatus: false
        }
    },
    methods: {
        logIn() {
            if (this.ime === this.unesenoIme) {
                if (this.lozinka === this.unesenaLozinka) {
                    this.loggedStatus = true;
                }
            }
        },
        submitForm() {
            this.title = this.video.title;
            this.description = this.video.description;
            this.file = this.video.src;
            console.log(this.title, this.description, this.file)
            axios.post('http://localhost:8080/tutorials', {
                title: this.title,
                description: this.description,
                file: this.file

            })
                .then(response => {
                    console.log(response)
                    console.log(this.title, this.description, this.file)
                })
        }
    }
}
</script>

<style scoped>
div{
    width: 40%;
    margin:auto;
}
.form {
    background-color: #CC2936;
    padding: 5rem;
    margin-top: auto;
    box-shadow: 5px 5px 5px 5px;
    margin-top: 5rem;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    margin-bottom: 2rem;
}
</style>