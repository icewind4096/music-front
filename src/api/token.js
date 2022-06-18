import {post} from './request.js'

export function createToken(username, password) {
    return post('/tokens', {userName: username, password: password})
}
