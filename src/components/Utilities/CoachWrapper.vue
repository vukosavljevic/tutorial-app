<template>
    <router-link :to="'/profile/' + name" class="tutorial--profile">
        <div class="profile--icon">
            <img :src="imageUrl" alt="news" v-if="imageUrl != ''" />
            <img class="unknown" src="@/assets/Sample_User_Icon.png" alt="news" v-else />
        </div>
        <h1>{{ name }}</h1>
    </router-link> 
</template>

<script>
import axios from 'axios';
export default {
    props: ['name', 'id'],
    data(){
        return {
            imageUrl: ''
        }
    },
    created() {
        axios.get(`http://localhost:8080/upload/${this.name}`, { responseType: 'blob' })
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
.profile--icon {
    position: absolute;
    top: -35px;
    left: -40px;
}

a {
    position: relative;
    padding: 1rem;
}
.unknown{
    background-color: white;
    padding:0.25rem;
}
.tutorial--profile {
    display: flex;
    align-items: center;
    background: white;
    width: 100%;
    margin: auto;
    margin-bottom: 2rem;
    border-radius: 10px;
}

h1 {
    margin-left: 6rem;
}

img {
    width: 124px;
    height: 124px;
    background-color: transparent;
    padding: 1rem;
    border-radius: 50%;
}
</style>