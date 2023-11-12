import React,{useContext} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AuthForm from '../components/AuthFrom';
import Navlink from '../components/NavLink';
import {Context} from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SigninScreen = () => {
    const {state,signin,clearErrorMessage}=useContext(Context);

    return (<View style={styles.container}>
    <NavigationEvents onWillFocus={clearErrorMessage} />
    <AuthForm headerText="Sign in to your Account" errorMessage={state.errorMessage} onSubmit={signin} submitButtonText="Sign In" />
    <Navlink text="Don't have an account? Sign up instead" routeName="Signup" />
    </View>)
};

SigninScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginBottom:250
    }
});

export default SigninScreen;

