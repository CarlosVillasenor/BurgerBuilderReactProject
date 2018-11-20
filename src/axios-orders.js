import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-69179.firebaseio.com/'
});

export default instance;