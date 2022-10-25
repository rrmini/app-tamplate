import axios from "../../axios";

const state = {
    isLoggedIn: false,
    userDetails: {},
    errors: [],
    invalidCredentials: '',
}
const actions = {
    registerUser(ctx, user) {
        return new Promise((resolve, reject) => {
            axios
                .get('sanctum/csrf-cookie')
                .then(response => {
                    axios
                        .post('/register', user)
                        .then(response => {
                            if (response.data) {
                                resolve(response)
                            }
                            else {
                                reject( response )
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 422 ) {
                                ctx.commit('setErrors', error.response.data.errors)
                            }
                            reject(error)
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
                        localStorage.setItem('token', response.data.access_token)
                        ctx.commit('setLoggedIn', true);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) =>{
                    if(error.response.data.error) {
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                    }  else if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    }
                    reject(error)
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
                    } else if (error.response.status === 500) {
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                    }
                     reject(error)
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
                    if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    } else if (error.response.status === 500) {
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                    }
                    reject(error)
                })
        })
    },

    changePassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/change-password', payload)
                .then((response) => {
                    if (response.data.success){
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    } else if (error.response.status === 500) {
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                    }
                    reject(error)
                })
        })
    },

    updateDetails(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/change-details', payload)
                .then((response) => {
                    if (response.data.success){
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        ctx.commit('setErrors', error.response.data.errors)
                    } else if (error.response.status === 500) {
                        ctx.commit('setInvalidCredentials', error.response.data.error)
                    }
                    reject(error)
                })
        })
    },

    currentUser(ctx) {
        return new Promise((resolve, reject) => {
            axios.get('me')
                .then((response) =>{
                    ctx.commit('setUserDetails', response.data.data)
                    resolve(response)
                }).catch((error) => {
                reject(error)
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
    setUserDetails(state, payload) {
        state.userDetails = payload
    }
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
    userDetails(state) {
        return state.userDetails
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
