import axiosClient from './axios';

const tokenAuth = token => {
    if(token){
        axiosClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }else{
        delete axiosClient.defaults.headers.common["authorization"];
    }
}

export default tokenAuth;