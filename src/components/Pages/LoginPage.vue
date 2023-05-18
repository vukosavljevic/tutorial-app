<template>
    <div class="login--wrapper">
        <div class="login--backdrop" @click="closeLogin"></div>
        <div :class="{ hidden: hide }" class="form--wrapper">
            <div class="form">
                <div class="form--image">
                    <img src="@/assets/desk-g6faa3df6b_1920.jpg" alt="">
                </div>
                <form @submit.prevent="registerUser" class="form--content">
                    <div>
                        <label for="">Name</label>
                        <input type="text" v-model="registerIme">
                        <label for="">Password</label>
                        <input type="password" v-model="registerLozinka">
                        <label for="">Repeat password</label>
                        <input type="password" v-model="ponovljenaRegisterLozinka">
                        <button class="form--button">Register</button>
                    </div>
                    <div class="form--content-switch">
                        <p>You already have an account ?</p>
                        <button @click="switchToLog" class="form--button">Log in</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="registerStatus" class="form--wrapper">
            <div class="form" v-if="!loggedStatus">
                <form @submit.prevent="logIn" class="form--content">
                    <div>
                        <label for="">Name</label>
                        <input type="text" v-model="unesenoIme">
                        <label for="">Password</label>
                        <input type="password" v-model="unesenaLozinka">
                        <button class="form--button">Log In</button>
                    </div>
                    <div class="form--content-switch">
                        <p>Not registered yet ?</p>
                        <button @click="switchToRegister" class="form--button">Register</button>
                    </div>
                </form>
                <div class="form--image">
                    <img src="@/assets/desk-g6faa3df6b_1920.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            registerIme: '',
            registerLozinka: '',
            ponovljenaRegisterLozinka: '',
            admin: {},
            unesenoIme: '',
            unesenaLozinka: '',
            currentUser: '',
            loggedStatus: false,
            registerStatus: false,
            userStatus: false,
            hide: false,
            users: []
        }
    },
    methods: {
        switchToLog() {
            this.registerStatus = true;
            this.hide = true;
        },
        switchToRegister() {
            this.hide = false;
            this.registerStatus = false;
        },
        commitState() {
            this.$store.commit('switchLoggedState')
        },
        closeLogin() {
            this.$store.commit('showLoginPage');
        },
        registerUser() {
            if (this.registerIme != '') {
                if (this.registerLozinka === this.ponovljenaRegisterLozinka) {
                    axios.post('http://localhost:8080/users', {
                        name: this.registerIme,
                        password: this.registerLozinka
                    })
                        .then(() => {
                            this.loggedStatus = true;
                            this.hide = true;
                            this.registerStatus = true;
                        }
                        )

                }
            }
        },
        logIn() {
            const proxyArray = this.users[0];
            for (let i = 0; i < proxyArray.length; i++) {
                console.log(proxyArray[i])
                if (proxyArray[i].name === this.unesenoIme) {
                    if (proxyArray[i].password === this.unesenaLozinka) {
                        this.loggedStatus = true;
                        this.currentUserName = proxyArray[i].name;
                        this.currentUserId = proxyArray[i].id;
                        const currentUser = { name: this.currentUserName, id: this.currentUserId }
                        this.$store.commit('insertData', currentUser)
                        this.$store.commit('switchLoggedState');
                        this.$router.push('/')
                        this.$store.commit('showLoginPage');
                    }
                }
            }
        },
    },
    computed: {
        ...mapGetters['loggedState']
    },
    created() {
        axios.get('http://localhost:8080/admin')
            .then(
                res => {
                    const data = res.data[0]
                    this.admin = data;
                }
            )
        axios.get('http://localhost:8080/users').
            then(
                res => {
                    const data = res.data;
                    this.users.push(data);
                }
            )
    }
}
</script>

<style scoped>
.form--wrapper {
    z-index: 100;
    width: 75%;
}

.login--wrapper {
    display: flex;
    position: relative;
    justify-content: center;
    position: absolute;
}

.login--backdrop {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    opacity: 0.5;
    cursor: pointer;
}

img {
    height: 100%;
    width: 100%;
}

.form {
    background: linear-gradient(315deg, #42d392 25%, #647eff);
    margin-top: 5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 2px solid black;
    z-index: 10;
}

.form--image {
    width: 70%;
}

.form--content {
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
}

.form--content-switch {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.form--button {
    background-color: white;
    color: black;
    width: 80%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    font-size: 1rem;
    opacity: 0.5;
    transition: 0.3s ease;
    margin-top: 0.5rem;
}

.form--button:hover {
    transition: 0.3s ease;
    opacity: 1;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;

    background-color: #fafafa;
    border: 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    transition: .3s box-shadow;
}

input:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.hidden {
    display: none !important;
}
</style>