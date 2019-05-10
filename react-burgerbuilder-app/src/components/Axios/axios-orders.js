import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burgerbuilder-d3e6e.firebaseio.com/'
});

export default instance;
