<template>
    <div class="tutorial--container" v-if="loggedState">
        <div class="tutorial--profile">


            <div class="user--icon-wrapper" v-if="userEditState">
                <label for="file-input" class="custom-file-upload">
                    Choose File
                </label>
                <input id="file-input" type="file" @change="onFileChange"><img class="edit--icon-position"
                    src="@/assets/pencil-on-a-square-outline.png" alt="Pen Icon" />
                <img src="@/assets/Sample_User_Icon.png" alt="User icon" class="user--icon-height" v-if="imageUrl === '' && !userEditState">
            </div>
            <img src="@/assets/Sample_User_Icon.png" alt="User icon" class="user--icon" v-if="imageUrl === ''">
            <img :src="imageUrl" :alt="altText" v-else>
            <button class="edit--icon" @click="editPage" v-if="loggedState"><img class="edit--icon"
                    src="@/assets/pencil-on-a-square-outline.png" alt="Pen Icon"></button>
            
            
            <h1><span>@{{ profileInfo.name }}</span></h1>
            <div class="tutorial--profile-about" v-if="!userEditState">
                <button class="edit--icon" @click="editPage"><img class="edit--icon"
                        src="@/assets/pencil-on-a-square-outline.png" alt="Pen Icon"></button>
                <b>{{ profileInfo.position }}</b>
                <p>Date of birth: {{ profileInfo.date }}</p>
                <p>School: {{ profileInfo.school }}</p>
            </div>


            <form @submit.prevent="sendEdited" v-if="userEditState" class="form--edit">
                <div class="tutorial--profile-about">
                    <p><b>Position: <input type="text" placeholder="Student" v-model="positionEdited"></b></p>
                    <p><b>Date of birth: <input type="text" placeholder="18/07/2023" v-model="dateEdited"></b></p>
                    <p><b>School: <input type="text" placeholder="ELPROS" v-model="schoolEdited"></b></p>
                </div>
                <h1><span>About</span></h1>
                <b><textarea type="text" placeholder="Tell us something about you?" class="textarea"
                        v-model="aboutEdited"></textarea></b>
                <button @click="sendEdited"><span>Save changes...</span></button>
            </form>


            <div v-if="!userEditState" class="desc-profile">
                <h1><span>About</span></h1>
                <p>{{ profileInfo.about }}</p>
            </div>
        </div>
        <skill-list @user-edited="addAnimation" :class="{ animate: animated }"></skill-list>
    </div>
    <div v-else class="tutorial--profile-not-logged">
        <h1>You need to log in to have access to your profile! </h1>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import SkillList from '../Utilities/SkillList.vue';
export default {
    components: {
        SkillList
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        altText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            userEditState: false,
            popupClass: false,
            animated: false,
            file: null,
            positionEdited: '',
            dateEdited: '',
            schoolEdited: '',
            aboutEdited: '',
            imageUrl: '',
            userName: '',
            profileInfo: {},

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
        },
        onFileChange(event) {
            this.file = event.target.files[0];
        },
        editPage() {
            this.$store.commit('switchUserEditState');
            this.userEditState = !this.userEditState;
            this.popupClass = !this.popupClass;
            axios.get('http://localhost:8080/users/' + this.currentUser.name).
                then(res => {
                    const data = res.data[0];
                    this.profileInfo = data;
                })
        },
        setDefaults() {
            if (this.positionEdited === '') {
                this.positionEdited = this.profileInfo.position;
            }
            if (this.dateEdited === '') {
                this.dateEdited = this.profileInfo.date;
            }
            if (this.schoolEdited === '') {
                this.schoolEdited = this.profileInfo.school;
            }
            if (this.aboutEdited === '') {
                this.aboutEdited = this.profileInfo.about;
            }
        },
        addAnimation(editState) {
            if (editState) {
                this.animated = true;
            }
            else {
                this.animated = false
            }
        },
        sendEdited() {
            this.setDefaults();
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('author', this.currentUser.name)
            axios.patch('http://localhost:8080/users/' + this.currentUser.name, {
                position: this.positionEdited,
                date: this.dateEdited,
                school: this.schoolEdited,
                about: this.aboutEdited
            })
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'loggedState'])
    },
    mounted() {
        const idParam = this.currentUser.name;
        axios.get('http://localhost:8080/users/' + idParam).
            then(res => {
                const data = res.data[0];
                this.profileInfo = data;
            })
    },
    created() {
        axios.get(`http://localhost:8080/upload/${this.currentUser.name}`, { responseType: 'blob' })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                this.imageUrl = imageUrl;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>

<style scoped>
.form--edit {
    display: flex;
    flex-direction: column;
}

.tutorial--profile-not-logged {
    text-align: center;
}

.form--edit input {
    min-width: 50%;
    max-width: 100%;
    border: none;
    font-size: 1rem;
}

.desc-profile {
    margin-bottom: 2rem;
}

.form--edit placeholder {
    font-weight: bold;
}

textarea {
    border: none;
    font-size: 1.2rem;
}

button {
    width: 100%;
    font-weight: bold;
    padding-bottom: 0;
}

.custom-file-upload {
    padding: 10px 3px;
    cursor: pointer;
    font-size: 16px;
    color: transparent;
    background-color: transparent;
    outline: none !important;
    border: none !important;
    position: absolute;
    top: 80px;
    left: 250px;
    z-index: 10;
}

.textarea {
    width: 100%;
}

input[type="file"] {
    display: none;
}

.cross {
    position: relative;

    width: 24px;
    height: 24px;
}

.bar {
    width: 100%;
    height: 4px;
    position: absolute;
    background-color: black;
    top: 50%;
    border-radius: 10px;
}

.bar:nth-child(1) {
    transform: rotate(45deg);
}

.bar:nth-child(2) {
    transform: rotate(-45deg);
}

.tutorial--container {
    position: relative;

    margin-top: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

.tutorial--profile-description h1 {
    margin-bottom: 1rem;
}

li {
    list-style-type: none;
}

.tutorial--container button {
    margin: auto;
    font-weight: bold;
    border: none;
    margin-bottom: 2rem;
}

.edit--icon {
    height: 22px;
    width: 22px;
    position: absolute;
    top: -10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0, 0, 0, 0.1);
    right: -10px;
}

.edit--icon-position {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 80px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0, 0, 0, 0.1);
    right: 150px;
}

.tutorial--profile {
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    width: 25%;
    margin-bottom: 2rem;
    margin-right: 3rem;
    border-radius: 10px;
    padding: 0 2rem;
}

.user--icon-wrapper {
    position: relative;
    width: 100%;
}

.user--icon-height {
    height: 100% !important;
}

.tutorial--profile-about {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
}

.tutorial--profile-about>p {
    opacity: 0.5;
}

.tutorial--profile>p {
    opacity: 0.5;
}

.tutorial--profile-description {
    display: flex;
    flex-direction: column;
}

img {
    width: 90%;
    height: 50%;
    padding: 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.tutorial--wrapper {
    width: 500px;
}

.edit--popup {
    top: 150%;
    width: 50vw;
    height: 80vh;
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0, 0, 0, 0.1);
    position: absolute;

    transition: .4s ease-out;
}

.animated {
    top: -10% !important;

    transition: .4s ease-in;
}

input {
    background: transparent;
    z-index: 10;
    width: 22px;
    height: 22px;
}

input[type="file"] {
    background: transparent;
    border: 10px solid black
}

.animate {
  animation-duration: 3s;
  animation-name: slidein;
  animation-fill-mode: forwards;
}

/* @keyframes slidein {
  from {
    left:0%;
  }

  to {
    left:-25%;
  }
} */
</style>