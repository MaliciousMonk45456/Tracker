import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance= axios.create({
    baseURL:'https://abfc-2401-4900-563f-6078-1d64-1697-caf9-2cfc.ngrok-free.app'
});

instance.interceptors.request.use(
    async (config)=>{
        const token=await AsyncStorage.getItem('token');
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
            // return config;
        }
        return config;
    },
    (err)=>{
        console.log(err);
        return Promise.reject(err);
    }
);

export default instance;