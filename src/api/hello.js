import {get} from './request.js'

export const sayHello = function(){
    return get('/hello/sayHello')
}
