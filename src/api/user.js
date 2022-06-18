import {post} from './request.js'

export function login(username, password) {
    return post('/login', null, {params:{username: username, password: password}})
}

export function pageList(page, limit, searchObj) {
    return post(`/api/users/list/${page}/${limit}`, null, {params: searchObj})
}
