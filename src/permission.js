import router from './router'
import store from './store'
import {getToken} from "./utils/auth.js";
import { Notify } from "quasar";

const whiteList = ['/login', '/403', '/404'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            const currentUser = store.state.user.currentUser;
            const isAdmin = currentUser.roles.find(item => {
                return item.name === 'ROLE_ADMIN'
            });
            if (isAdmin){
                next()
            } else {
                await store.dispatch("user/logout")
                Notify.create({
                    type: 'negative',
                    message: '无权限登录后台管理系统',
                    position: 'top',
                })
                next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
})
