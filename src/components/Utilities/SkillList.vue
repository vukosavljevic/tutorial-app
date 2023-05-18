<template>
    <div class="tutorial--profile-description">
        <div class="description--wrapper">
            <button class="edit--icon" @click="editPage" v-if="loggedState"><img class="edit--icon"
                    src="@/assets/pencil-on-a-square-outline.png" alt="Pen Icon"></button>
            <h1><span>List of skills : </span>{{ allSkills.length }}</h1>
            <div v-if="!userEditState">
                <ul v-if="allSkills.length > 0">
                    <li v-for="skill in allSkills" :key="skill.id">
                        {{ skill.skills }}</li>
                </ul>
                <div v-if="allSkills.length === 0">
                    <p>User is yet to add his skills</p>
                </div>
            </div>
            <div class="skill-container" v-if="userEditState">
                <ul v-if="allSkills.length > 0">
                    <li v-for="skill in allSkills" :key="skill.id">
                        {{ skill.skills }}
                        <button @click="deleteSkill(skill.id)">X</button>
                    </li>
                </ul>
                <div class="skill-container-input">
                    <input type="text" v-if="userEditState" v-model="currentSkill">
                    <button @click="addSkill">+</button>
                </div>
            </div>
        </div>
        <div class="description--wrapper">
            <h1><span>Number of posts : </span>{{ userTutorials.length }}</h1>
            <tutorial-profile-card v-for="tutorial in featuredTutorials" :id="tutorial.id" :key="tutorial.id"
                :title="tutorial.title" :video="tutorial.video"></tutorial-profile-card>
            <button v-if="userTutorials.length >= 3" @click="goToAll">Show more</button>
            <div v-if="userTutorials.length === 0">
                <h4>Add a video and be better than yesterday!</h4>
            </div>
        </div>
    </div>
</template>
 
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import TutorialProfileCard from './TutorialProfileCard.vue';
export default {
    components: {
        TutorialProfileCard
    },
    data() {
        return {
            userTutorials: [],
            featuredTutorials: [],
            allSkills: [],
            userEditState: false,
            currentSkill: '',
            bufferArray: []
        }
    },
    methods: {
        returnUsers(user) {
            return user.author === this.currentUser.name;
        },
        editPage() {
            this.userEditState = !this.userEditState
            this.$emit('user-edited', this.userEditState)
        },
        deleteSkill(id) {
            if (id !== undefined) {
                axios.delete(`http://localhost:8080/skills/${id}`);
                this.bufferArray = this.allSkills.filter(skill => {
                    if (skill.id === id) {
                        return false
                    }
                    else {
                        return true
                    }
                })
                this.allSkills = this.bufferArray;
            }
            else {
                this.bufferArray = this.allSkills.filter(skill => {
                    if (skill.id === id) {
                        return false
                    }
                    else {
                        return true
                    }
                })
                this.allSkills = this.bufferArray;
            }
        },
        goToAll(){
            this.$router.push('/history')
        },
        addSkill() {
            axios.post('http://localhost:8080/skills', {
                skills: this.currentSkill,
                author: this.currentUser.name
            })
            const localSkill = {
                author: this.currentUser.name,
                skills: this.currentSkill
            };
            this.allSkills.push(localSkill)
            this.currentSkill = '';
        },
        returnSkills(skill) {
            return skill.user === this.currentUser.name;
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'loggedState'])
    },
    created() {
        axios.get('http://localhost:8080/skills')
            .then(res => {
                const data = res.data;
                const bufferSkills = data;
                this.allSkills = bufferSkills.filter(this.returnSkills)
            })
    },
    mounted() {
        axios.get('http://localhost:8080/tutorials')
            .then(res => {
                const data = res.data;
                const allTutorials = data;
                this.userTutorials = allTutorials.filter(this.returnUsers)
                this.featuredTutorials = this.userTutorials.slice(0, 3);
            })
    }
}
</script>

<style scoped>
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

img {
    width: 90%;
    height: 50%;
    padding: 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.tutorial--profile-description {
    display: flex;
    flex-direction: column;
    position: relative;
}

.description--wrapper {
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
}

button {
    width: 100%;
    padding: 1rem;
}

h1 {
    margin-bottom: 1rem;
}

.skill-container {
    display: flex;
    flex-direction: column;
}

.skill-container-input {
    display: flex;
}

.skill-container li:last-child {
    margin-bottom: 1rem;
}

.skill-container input {
    width: 80%;
}

input {
    font-size: 1.5rem;
}

.skill-container button {
    border: none;
    width: 10%;
    height: 40px;
    padding: 0.5rem;
    font-size: 1.5rem;
}
</style>