import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_KEY = "3b7638719d36a9c2ec147a7e1576bbe7";


const WeatherHome = () => {
    const [address, setAddress] = useState("Ha Noi");
    const [temp, setTemp] = useState('0');
    const [status, setStatus] = useState("")
    getWeatherDataAsync = () => {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=3b7638719d36a9c2ec147a7e1576bbe7')
            .then((res) => {
                console.log(res.data)
                const weatherData = res.data;
                setAddress(weatherData.name)
                setTemp(weatherData.main.temp)
                setStatus(weatherData.weather[0].main)
            })
            .catch(e => {
                console.log("Error + ", e)
            })
    };

    useEffect(() => {
        getWeatherDataAsync();
    }, [])

    return <ImageBackground source={require('../../assets/weather_background/day_partlycloudy.png')} resizeMode='cover' style={{ width: '100%', height: '110%' }} >
        <View style={styles.infoContainer}>
            <Text style={styles.textAddress}>{address}</Text>
            <Text style={styles.textDateTime}>T.3, 28 tháng 7 23:22</Text>
            <View style={styles.tempContainer}>
                <Ionicons name="md-cloudy-night-outline" style={styles.iconStatus} />
                <Text style={styles.textTemp}>{temp} C</Text>
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
        fontSize: 50,
        color: 'white',
        marginRight: 20
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