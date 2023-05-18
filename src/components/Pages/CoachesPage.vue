<template>
    <main>
        <h1><span>Currently active coaches: </span></h1>
        <div class="content--wrapper">
            <coach-wrapper v-for="coach in coaches" :key="coach.id" :id="coach.id" :name="coach.name"></coach-wrapper>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            coaches: []
        }
    },
    mounted() {
        axios.get('http://localhost:8080/users')
            .then(res => {
                const data = res.data;
                console.log(data)
                this.coaches = data;
                console.log(this.coaches)
            })
        const proxyArray = this.coaches[0];
        console.log(proxyArray)
    }
}
</script>

<style scoped>
main{
    display: flex;
    flex-direction: column;
}
h1{
    padding:2rem;
}
.content--wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5rem;
    padding: 0 10rem;
}
</style>