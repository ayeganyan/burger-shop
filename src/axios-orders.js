import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-shop-ay.firebaseio.com/'
})

export default instance