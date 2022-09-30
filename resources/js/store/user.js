import axios from "axios";

const state = {
    isLoggedIn: false,
    userDetails: {},
}
const actions = {
    loginUser(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/login', payload)
                .then((response) => {
                    localStorage.setItem('token', payload);
                    ctx.commit('setLoggedIn', true);
                    resolve(response);
                })
                .catch((error) =>{
                    reject(error);
                })
        })
    },

    logoutUser (ctx) {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false)
            resolve(true);
        })
    },

    setLoggedInState(ctx) {
        return new Promise((resolve) => {
            if(localStorage.getItem('token')){
                ctx.commit('setLoggedIn', true);
                resolve(true);
            } else {
                ctx.commit('setLoggedIn', false)
                resolve(false);
            }
        })
    },
}
const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
}
const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
