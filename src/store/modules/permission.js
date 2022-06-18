const permission = {
    namespaced: true,
    state: {
        routes: []
    },
    actions:{
        generateRoutes({commit}){
            return new Promise(resolve => {
                const accessRoutes = asyncRoutes || [];
                commit('SET_ROUTES', accessRoutes);
                resolve(accessRoutes);
            })
        }
    },
    mutations: {
        SET_ROUTES: (state, routes) =>{
            state.routes = routes;
        }
    },
    getters: {
    },
}

export default permission
