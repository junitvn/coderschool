import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChooseCard = (props) => {
    const { name: playerName, choice } = props;
    const { uri, name } = choice;
    return (
        <View>
            <Text>{playerName}</Text>
            <Image source={{ uri }} style={{ width: 50, height: 50 }} resizeMode="cover" />
            <Text>{name}</Text>
        </View>
    )
}

const Homework = () => {
    const [yourChoice, setYouChoice] = useState({});
    const [computerChoice, setComputerChoice] = useState({});
    const CHOICES = [
        {
            name: 'rock',
            uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
        },
        {
            name: 'paper',
            uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
        },
        {
            name: 'scissors',
            uri:
                'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
        }
    ];

    return <View style={styles.container}>
        <Text style={styles.textResult}>Homework</Text>
        <View style={styles.gameContainer}>
            <ChooseCard name="You" choice={CHOICES[0]} />
            <Text>vs</Text>
            <ChooseCard name="Computer" choice={CHOICES[2]} />
        </View>
        <View style={styles.controlerContainer}>

        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textResult: {
        flex: 1,
        fontSize: 22,
        alignSelf:'center',
        marginTop: 8
    },
    gameContainer: {
        flex: 3,
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    controlerContainer:{
        flex: 10
    }
})

export default Homework;