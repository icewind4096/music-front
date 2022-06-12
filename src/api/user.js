import {post} from './request.js'

export function login(username, password) {
    return post('/login', null, {params:{username: username, password: password}})
}
