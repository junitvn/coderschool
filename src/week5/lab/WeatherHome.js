import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

const API_KEY = "3b7638719d36a9c2ec147a7e1576bbe7";

const WeatherHome = () => {

    const [address, setAddress] = useState("Ha Noi");
    const [temp, setTemp] = useState('0');
    const [status, setStatus] = useState("")
    const [iconId, setIconId] = useState('')
    const [imageBackground, setImageBackground] = useState(require('../../assets/weather_background/day_partlycloudy.png'))

    const getLatlng = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                getWeatherDataAsync(currentLatitude, currentLongitude);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
        );
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
            }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getLatlng();
            } else {
                alert("Permission Denied");
            }
        } catch (err) {
            alert("err", err);
            console.warn(err)
        }
    }

    const changeIconBackground = (status, icon) => {
        const lowerStatus = _.toLower(status);
        if (lowerStatus.includes('rain')) {
            icon.includes('d') ? setImageBackground(require('../../assets/weather_background/day_rain.png')) :
                setImageBackground(require('../../assets/weather_background/night_rain.png'));
        } else if (lowerStatus.includes('clear')) {
            icon.includes('d') ? setImageBackground(require('../../assets/weather_background/day_clearsky.png')) :
                setImageBackground(require('../../assets/weather_background/night_clearsky.png'));
        } else if (lowerStatus.includes('clouds')) {
            icon.includes('d') ? setImageBackground(require('../../assets/weather_background/day_cloudy.png')) :
                setImageBackground(require('../../assets/weather_background/night_cloudy.png'));
        } else if (lowerStatus.includes('mist')) {
            icon.includes('d') ? setImageBackground(require('../../assets/weather_background/day_fog.png')) :
                setImageBackground(require('../../assets/weather_background/night_partlycloudy.png'));
        } else if (lowerStatus.includes('snow')) {
            icon.includes('d') ? setImageBackground(require('../../assets/weather_background/day_snow.png')) :
                setImageBackground(require('../../assets/weather_background/night_snow.png'));
        } else {

        }
    }

    const getWeatherDataAsync = (lat, lng) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=vi&units=metric&appid=${API_KEY}`)
            .then((res) => {
                console.log(res.data)
                const weatherData = res.data;
                setAddress(weatherData.name)
                setTemp(weatherData.main.temp)
                setStatus(_.upperFirst(weatherData.weather[0].description))
                setIconId(weatherData.weather[0].icon)
                changeIconBackground(weatherData.weather[0].main, weatherData.weather[0].icon)
            })
            .catch(e => {
                console.log("Error + ", e)
            })
    };

    useEffect(() => {
        requestLocationPermission();
    }, [])

    // moment.locale('vi')

    return <ImageBackground source={imageBackground} resizeMode='cover' style={{ width: '100%', height: '110%' }} >
        <View style={styles.infoContainer}>
            <Text style={styles.textAddress}>{address}</Text>
            <Text style={styles.textDateTime}>{moment(new Date()).locale('vi').format('MMM DD, HH:MM')}</Text>
            <View style={styles.tempContainer}>
                <Image source={{ uri: `http://openweathermap.org/img/wn/${iconId}@2x.png` }} style={styles.iconStatus} />
                <Text style={styles.textTemp}>{temp}°C</Text>
            </View>
            <Text style={styles.textStatus}>{status}</Text>
        </View>
    </ImageBackground >
}

const styles = StyleSheet.create({
    infoContainer: {
        alignItems: 'center',
    },
    textAddress: {
        fontSize: 25,
        color: 'white',
        marginTop: '15%'
    },
    textDateTime: {
        fontSize: 16,
        color: 'white'
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStatus: {
        width: 80,
        height: 80
    },
    textTemp: {
        fontSize: 60,
        color: 'white'
    },
    textStatus: {
        fontSize: 18,
        color: 'white'
    },
})

export default WeatherHome;