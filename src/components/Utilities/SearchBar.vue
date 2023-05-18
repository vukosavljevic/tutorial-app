<template>
    <div>
        <form @submit.prevent="submitSearch">
            <input type="text" placeholder="Unesite pojam..." v-model="searchUnit" />
                <div class="search--part">
                    <button @click="submitSearch">
                    <img src="@/assets/49116.png" alt="Magnifier icon">
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchUnit: '' // prouciti .filter i .contanins u vuejsu
        }
    },
    methods: {
        submitSearch() {
            this.$emit('search-data', this.searchUnit)
        }
    }
}
</script>

<style scoped>
div {
    position: relative;
}

input {
    display: block;
    width: 50%;
    margin: 10px 0;
    padding: 10px;

    background-color: #fafafa;
    border: 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    transition: .3s box-shadow;
    margin-left: 30rem;
}

input:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.search--part {
    position: absolute;
    top: 15%;
    border: 0 !important;

    right: 8%;
    width: 20% !important;
}

button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 22px;
    height: 22px;
}
</style>