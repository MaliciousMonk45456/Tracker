import React,{useContext,useState} from "react";
import {Text,StyleSheet} from "react-native";
import MapView,{Polyline,Circle} from "react-native-maps";
import {Context as LocationContext} from "../context/LocationContext";
import { ActivityIndicator } from "react-native-paper";

const Map=()=>{
    const {state:{currentLocation,locations}}=useContext(LocationContext);
    const initialLocation={latitude:29.9612101,longitude:78.1771770};
    const [CurrRegion,setCurrRegion]=useState(initialLocation);

    if(!currentLocation){
        return <ActivityIndicator size="large" style={{marginTop:200}} />
    }

    if(currentLocation.coords.latitude-CurrRegion.latitude>0.004500 || currentLocation.coords.longitude-CurrRegion.longitude>0.004500){
        setCurrRegion({longitude:currentLocation.coords.longitude,latitude:currentLocation.coords.latitude});
    }

    if(currentLocation.coords!=CurrRegion){
        return <MapView style={styles.map} initialRegion={{
            ...CurrRegion,
            latitudeDelta:0.01, 
            longitudeDelta:0.01}} 
            region={{
                ...CurrRegion,
                latitudeDelta:0.01, 
                longitudeDelta:0.01}}>
    
            <Circle 
            center={currentLocation.coords} 
            radius={30} 
            strokeColor="rgba(158,158,255,1.0)" 
            fillColor="rgba(158,158,255,0.3)" />
            <Polyline coordinates={locations.map(loc=>loc.coords)} />

        </MapView>    
    }

    else{
    return <MapView style={styles.map} initialRegion={{
        ...CurrRegion,
        // ...initialLocation,
        latitudeDelta:0.01, 
        longitudeDelta:0.01}}>
        <Circle 
        center={currentLocation.coords} 
        radius={30} 
        strokeColor="rgba(158,158,255,1.0)" 
        fillColor="rgba(158,158,255,0.3)" />

        <Polyline coordinates={locations.map(loc=>loc.coords)} />
    </MapView>
    }
}

const styles=StyleSheet.create({
    map:{
        height:300
    }
});

export default Map;