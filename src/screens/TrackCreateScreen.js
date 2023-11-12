import '../_mockLocation';
import React,{useEffect,useState,useContext,useCallback} from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

const TrackCreateScreen = ({isFocused}) => {
    const {state,addLocation}=useContext(LocationContext);
    const callback=useCallback((location)=>{addLocation(location,state.recording)},[state.recording]);
    const [err]=useLocation(isFocused||state.recording,callback);
    return <SafeAreaView forceInset={{top:'always'}}><Text h2>Create a Track</Text>
    <Map />
    {err?<Text>Please enable location services</Text>:null}
    <TrackForm />
    </SafeAreaView>
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={20} />
  };    

const styles=StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);