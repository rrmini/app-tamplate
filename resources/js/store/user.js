import axios from "axios";

const state = {
    isLoggedIn: false,
    userDetails: {},
    errors: [],
}
const actions = {
    registerUser(ctx, user) {
        return new Promise((resolve) => {
            axios
                .get('sanctum/csrf-cookie')
                .then(response => {
                    axios
                        .post('/api/register', user)
                        .then(response => {
                            if (response.data) {
                                localStorage.setItem('x-token', response.config.headers['X-XSRF-TOKEN'])
                                window.location.replace("/login")
                            } else {
                                reject( response )
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 422 ) {
                                ctx.commit('setErrors', error.response.data.errors)
                            } console.log(this.errors)
                        })
                })
        })
    },

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

    forgotPassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/forgot-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },

    resetPassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/reset-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
}
const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setErrors(state, invalidCredentials) {
        state.errors = invalidCredentials
    },
}
const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    errors(state) {
        return state.errors
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
