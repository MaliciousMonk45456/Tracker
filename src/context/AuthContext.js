import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";

const authReducer=(state,action)=>{
    switch(action.type){
        case 'add_error':
            return {...state,errorMessage:action.payload};
        case 'signin':
            return {errorMessage:'',token:action.payload};
        case 'clear_error_message':
            return {...state,errorMessage:''};
        case 'signout':
            return {token:null,errorMessage:''};
        default:
            return state;
    }
}

const tryLocalSignin=(dispatch)=>{
    return async ()=>{
        const token=await AsyncStorage.getItem('token');
        if(token){
            dispatch({type:'signin',payload:token});
            navigate('TrackList');
        } else {
            navigate('loginFlow');
        }
    }

}

const signup=(dispatch)=>{
    return async ({email,password})=>{
        try{ 
            const response=await trackerApi.post('/signup',{email,password});
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({type:'signin',payload:response.data.token});
            console.log(response.data);

            navigate('TrackList');
        } catch(err){
            dispatch({type:'add_error',payload:'Something went wrong with sign up'});
        }
    }
}

const clearErrorMessage=(dispatch)=>{
    return ()=>{
        dispatch({type:'clear_error_message'});
    }

}

const signin=(dispatch)=>{
    return async ({email,password})=>{
        try {
            const response=await trackerApi.post('/signin',{email,password});
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({type:'signin',payload:response.data.token});
            navigate('TrackList');
        } catch (err) {
            dispatch({type:'add_error',payload:'Something went wrong with sign in'});
        }
        // try to sign in
        // handle success by updating state
        // handle failure by showing error message(somewhow)
    }
}

const signout=(dispatch)=>{
    return async ()=>{
        // somehow sign out!!!
        await AsyncStorage.removeItem('token');
        dispatch({type:'signout'});
        navigate('loginFlow');
    }
}

export const {Provider,Context}=createDataContext(
    authReducer,
    {signin,signout,signup,clearErrorMessage,tryLocalSignin},
    {token:null,errorMessage:''}
)