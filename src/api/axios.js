
import axios from 'axios';

const apiUrl = 'https://giftcard-escalab-project.herokuapp.com/'; //your api base url
const proxyurl = "https://thingproxy.freeboard.io/fetch/"; //proxy for local testing, remove this in production version

const api = axios.create({
    baseURL:apiUrl,
})



export default api;
  
