import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burget-61813.firebaseio.com/'
})
instance.defaults.crossDomain = true;

export default instance;