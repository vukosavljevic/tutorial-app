<template>
    <div class="tutorial--container">
        <div class="tutorial--profile">
            <img :src="imageUrl" :alt="altText" v-if="imageUrl != ''">
            <img src="../../assets/Sample_User_Icon.png" alt="unknown" v-else>
            <h1><span>@{{ profileInfo.name }}</span></h1>
            <div class="tutorial--profile-about">
                <bold>{{ profileInfo.position }}</bold>
                <p>Date of birth: {{ profileInfo.date }}</p>
                <p>School: {{ profileInfo.school }}</p>
            </div>
            <div class="desc-profile">
                <h1><span>About</span></h1>
                <p>{{ profileInfo.about }}</p>
            </div>
        </div>
        <div class="tutorial--profile-description">
            <div class="description--wrapper">
                <h1><span>List of skills : </span>{{ SkillList.length }}</h1>
                <ul v-if="SkillList.length === 0">
                    <h4>No skills added</h4>
                </ul>
                <ul v-else>
                    <li v-for="skills in SkillList" :key="skills.id">
                        {{ skills.skills }}
                    </li>
                </ul>
            </div>
            <div class="description--wrapper">
                <h1><span>Number of posts : </span>{{ userTutorials.length }}</h1>
                <tutorial-profile-card v-for="tutorial in userFeatured" :id="tutorial.id" :key="tutorial.id"
                    :title="tutorial.title" :video="tutorial.video"></tutorial-profile-card>
                <div v-if="userTutorials.length === 0">
                    <h4>User is still to add a video to their profile!</h4>
                </div>
                <button v-if="userTutorials.length > 3" @click="goToAll">Show more</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.tutorial--container {
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    margin-bottom: 1rem;
}

.desc-profile {
    margin-bottom: 1rem;
}

li {
    list-style-type: none;
}

button {
    margin: auto;
    width: 100%;
    font-weight: bold;
}

.description--wrapper {
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
}

.tutorial--profile {
    display: flex;
    flex-direction: column;
    background: white;
    width: 30%;
    margin-bottom: 2rem;
    margin-right: 3rem;
    border-radius: 10px;
    padding: 0 2rem;
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
    background-color: white;
    padding: 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.tutorial--wrapper {
    width: 500px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import TutorialProfileCard from '../Utilities/TutorialProfileCard.vue';
// napravis tako da const idParam =  req.params.username il kak vec i po tom axiox.get('naziv' +id paraa)
export default {
    components: {
        TutorialProfileCard
    },
    data() {
        return {
            profileInfo: {},
            userTutorials: [],
            userFeatured: [],
            imageUrl: '',
            SkillList: []
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'loggedState']),
        param() {
            return this.$route.params.username
        }
    },
    methods: {
        returnUsers(user) {
            return user.author === this.param;
        },
        goToAll() {
            this.$router.push('/history')
        }
    },
    created() {
        axios.get('http://localhost:8080/tutorials')
            .then(res => {
                const data = res.data;
                const allTutorials = data;
                console.log(allTutorials)
                this.userTutorials = allTutorials.filter(this.returnUsers);
                this.userFeatured = this.userTutorials.slice(this.userTutorials.length - 3, this.userTutorials.length)
            }
            ),
            axios.get(`http://localhost:8080/skills/${this.param}`)
                .then(res => {
                    const data = res.data;
                    this.SkillList = data;
                })
        axios.get(`http://localhost:8080/upload/${this.param}`, { responseType: 'blob' })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                this.imageUrl = imageUrl;
            })
            .catch(error => {
                console.error(error);
            });
    },
    mounted() {
        axios.get('http://localhost:8080/users/' + this.param).
            then(res => {
                const data = res.data[0];
                console.log(data)
                this.profileInfo = data;
                console.log(this.profileInfo)
            })
    }
}
</script>


