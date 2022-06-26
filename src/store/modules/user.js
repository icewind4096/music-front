 import {getCurrentUser, getToken, removeCurrentUser, removeToken, setCurrentUser, setToken} from "../../utils/auth.js";
 import {createToken} from "../../api/token.js";
 import {me} from "../../api/user.js";
 import {useStore} from "vuex";

const user = {
    namespaced: true,
    state: {
        token: getToken(),
        currentUser: getCurrentUser(),
        roles: []
    },
    actions:{
        login({commit}, {username, password}){
            return new Promise((resolve, reject) => {
                createToken(username.trim(), password.trim())
                    .then(responseData => {
                        const token = responseData.items;
                        commit('SET_TOKEN', token);
                        setToken(token);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        logout({commit}){
            commit('SET_TOKEN', '');
            commit('SET_CURRENT_USER', null);
            removeToken();
            removeCurrentUser();
        },
        fetchCurrentUser({commit}){
            return new Promise((resolve, reject) => {
                me().then(responseData => {
                    commit('SET_CURRENT_USER', responseData.item);
                    setCurrentUser(responseData.item)
                    resolve(responseData.item);
                })
                .catch(error => {
                    reject(error);
                })
            });
        }
    },
    mutations: {
        SET_TOKEN: (state, token) =>{
            state.token = token;
        },
        SET_CURRENT_USER:(state, currentUser) =>{
            state.currentUser = currentUser;
        },
        SET_ROLES:(state, roles) => {
            state.roles = roles;
        },
    },
    getters: {
        nicknameFirstWord(state){
            return state.currentUser == null ? "" : state.currentUser.nickName.charAt(0).toUpperCase();
        },
        nickName(state){
            return state.currentUser == null ? "" : state.currentUser.nickName;
        }
    },
}

export default user
