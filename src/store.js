import { createStore } from 'vuex';


const store = createStore({
    state() {
        return {
            modeState: false
        }
    },
    mutations: {
        switchState(state) {
            // if(state.modeState === false){
            //     state.modeState = false
            // }
            // else{
            //     state.modeState = true
            // }
            state.modeState = !state.modeState
        }
    },
    actions: {
        switchState(context) {
            context.commit('switchState');
        }
    },
    getters : {
        switchedState(state){
            return state.modeState
        }
    }
});

export default store;