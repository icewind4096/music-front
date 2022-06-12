 import {getToken, removeToken, setToken} from "../../utils/auth.js";
 import {login} from "../../api/user.js";

const user = {
    namespaced: true,
    state: {
        username: "",
        nickname: "",
        token: getToken(),
        roles: []
    },
    actions:{
        login({commit}, {username, password}){
            return new Promise((resolve, reject) => {
                login(username.trim(), password.trim())
                    .then(response => {
                        const authorization = response.headers['authorization'];
                        commit('SET_TOKEN', authorization);
                        setToken(authorization);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        logout({commit}){
            commit('SET_TOKEN', '');
            commit('SET_ROLES', [])
            removeToken();
        }
    },
    mutations: {
        SET_TOKEN: (state, token) =>{
            state.token = token;
        },
        SET_NICKNAME:(state, nickname) => {
            state.nickname = nickname;
        },
        SET_ROLES:(state, roles) => {
            state.roles = roles;
        }
    },
    getters: {
        nicknameFirstWord(state){
            return state.nickname.charAt(0).toUpperCase();
        },
    },
}

export default user
