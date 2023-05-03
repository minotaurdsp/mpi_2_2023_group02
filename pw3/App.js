import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { useState,useRef,useEffect } from "react";

import * as Location from 'expo-location';

import MapView, {enableLatestRenderer, PROVIDER_GOOGLE } from 'react-native-maps';

import axios from 'axios';

const default_region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 240,
  },
  paragraph:{
    marginTop: 60,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    color: '#f44336',
    fontSize: 20,
    fontWeight : 'bold'
  },
  metrics:{
    marginTop: 2,
    paddingVertical: 3,
    alignItems: 'center',
    padding: 20,
    color: '#f44336'
  },
  weather_container:{
    marginTop: 2,
    width: '100%',
    marginTop: 0,
    height: '30%',
    backgroundColor: 'black',
  }
});

let demo_data = {"base": "stations", "clouds": {"all": 50}, "cod": 200, "coord": {"lat": 37.7858, "lon": -122.4064}, "dt": 1682935126, "id": 5391959, "main": {"feels_like": 282.92, "humidity": 84, "pressure": 1009, "temp": 283.62, "temp_max": 285.01, "temp_min": 282.18}, "name": "San Francisco", "sys": {"country": "US", "id": 2007646, "sunrise": 1682946835, "sunset": 1682996361, "type": 2}, "timezone": -25200, "visibility": 10000, "weather": [{"description": "scattered clouds", "icon": "03n", "id": 802, "main": "Clouds"}], "wind": {"deg": 338, "gust": 13.86, "speed": 10.28}}

export default function App() {

  // Location data
  const [region, setRegion] = useState(default_region);
  
  // Weather data
  const [data, setData] = useState(demo_data);

  // Error log
  const [errorMsg, setErrorMsg] = useState(null);

  // Google Map reference
  const mapRef = useRef();

  enableLatestRenderer()

  const getUserLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
      getWeathgerData(location.coords.latitude,location.coords.longitude)

    })();
  }
  
  const goToUserLocation = () => {
    mapRef.current.animateToRegion(region, 1 * 1000)
  }

  const getWeathgerData = (lat,lon) => {
    
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=37d8fe6718b5da78a074dd2cac8bb7ad`
    console.log("Weather url - ",weather_url)
    axios.get(weather_url)
        .then((json) => setData(json.data))
        .finally(() => goToUserLocation());
    setData(demo_data)

    goToUserLocation()
  };

  useEffect(() => {
    getUserLocation()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.weather_container}>
        <Text style={styles.paragraph}>{data?.name}, {data?.weather[0]?.description}</Text>
        <Text style={styles.metrics}>Wind speed: {data?.wind?.speed}</Text>
        <Text style={styles.metrics}>Temp: {data?.main?.temp} (f)</Text>
        <Text style={styles.metrics}>Feels like: {data?.main?.feels_like} (f)</Text>
        <Text style={styles.metrics}>Humidity: {data?.main?.humidity} (%)</Text>
        <Text style={styles.metrics}>Pressure:{data?.main?.pressure} kP</Text>
        <Text style={styles.metrics}>Visibility:{data?.visibility} (m)</Text>
      </View>
      <MapView
        style={styles.mapStyle}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={region}
      >
     </MapView>
     <StatusBar style="auto" />
    </View>
  );
}