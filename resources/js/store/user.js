import axios from "../../axios";

const state = {
    isLoggedIn: false,
    userDetails: {},
    errors: [],
    invalidCredentials: '',
}
const actions = {
    registerUser(ctx, user) {
        return new Promise((resolve) => {
            axios
                .get('sanctum/csrf-cookie')
                .then(response => {
                    axios
                        .post('/register', user)
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
                .post('/login', payload)
                .then((response) => {
                    if (response.data.access_token) {
                        // console.log(response.data)
                        localStorage.setItem('token', response.data.access_token)
                        ctx.commit('setLoggedIn', true);
                        window.location.replace("/dashboard")
                    } else {
                        reject(response);
                    }
                })
                .catch((error) =>{
                    // reject(error);
                    if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    } console.log(this.errors)
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
                .post('/forgot-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    } else if (error.response.status === 500)
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                })
        })
    },

    resetPassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/reset-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error.response)
                    if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    } else if (error.response.status === 500)
                        ctx.commit('setInvalidCredentials', error.response.data.error)
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
    setInvalidCredentials (state, invalidCredentials) {
        state.invalidCredentials = invalidCredentials
    },
}
const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    errors(state) {
        return state.errors
    },
    invalidCredentials(state) {
        return state.invalidCredentials
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
