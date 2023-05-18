import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            modeState: false,
            loggedState: false,
            loginPage: false,
            addPostState: false,
            currentUser: {},
            imageUrl: '',
            userEditState: false
        }
    },
    mutations: {
        switchState(state) {
            state.modeState = !state.modeState
        },
        switchUserEditState(state) {
            state.userEditState = !state.userEditState
        },
        async switchLoggedState(state) {
            await axios.get(`http://localhost:8080/upload/${state.currentUser.name}`, { responseType: 'blob' })
                .then(response => {
                    const imageUrl = URL.createObjectURL(response.data);
                    state.imageUrl = imageUrl;
                    console.log( "ovaj" + state.currentUser.name)
                })
                .catch(error => {
                    console.error(error);
                });
            state.loggedState = !state.loggedState
        },
        showLoginPage(state) {
            state.loginPage = !state.loginPage
        },
        insertData(state, payload) {
            state.currentUser = payload
        },
        addPost(state) {
            state.addPostState = !state.addPostState
        }
    },
    actions: {
        switchState(context) {
            context.commit('switchState');
        },
        showLoginPage(context) {
            context.commit('showLoginPage');
        },
        switchLoggedState(context) {
            context.commit('switchLoggedState')
        },
        switchUserEditState(context) {
            context.commit('switchUserEditState')
        },
        insertData(context) {
            context.commit('insertData')
        },
        addPost(context) {
            context.commit('addPost')
        }
    },
    getters: {
        showLogin(state) {
            return state.loginPage
        },
        switchedState(state) {
            return state.modeState
        },
        loggedState(state) {
            return state.loggedState
        },
        currentUser(state) {
            return state.currentUser
        },
        postState(state) {
            return state.addPostState
        },
        profilePicState(state) {
            return state.imageUrl
        },
        userEditState(state) {
            return state.userEditState
        }
    }
});

export default store;