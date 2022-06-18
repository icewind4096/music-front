import {post} from './request.js'

export function me() {
    return post(`/api/users/me`)
}

export function pageList(page, limit, searchObj) {
    return post(`/api/users/list/${page}/${limit}`, null, {params: searchObj})
}
