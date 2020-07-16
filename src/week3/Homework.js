import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ChooseCard = (props) => {
    const { name: playerName, choice } = props;
    const { uri, name } = choice;
    return (
        <View style={styles.cardContainer}>
            <Text>{playerName}</Text>
            <Image
                source={{ uri }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
            />
            <Text>{name}</Text>
        </View>
    );
};

const ButtonController = (props) => {
    const { choice, onPress } = props;
    const { name } = choice;
    return (
        <TouchableOpacity style={styles.buttonControllerContainer} onPress={() => onPress(choice)}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
};

const Homework = () => {
    const [yourChoice, setYouChoice] = useState({});
    const [computerChoice, setComputerChoice] = useState({});
    const [result, setResult] = useState('Mini game!');
    const [total, setTotal] = useState(0);
    const [win, setWin] = useState(0);
    const [tie, setTie] = useState(0);

    const CHOICES = [
        {
            name: 'rock',
            uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
        },
        {
            name: 'paper',
            uri:
                'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png',
        },
        {
            name: 'scissors',
            uri:
                'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png',
        },
    ];

    const onButtonPress = choice => {
        const [result, compChoice] = getRoundOutcome(choice);
        const computerChoice = CHOICES.filter(choice => choice.name === compChoice)
        setYouChoice(choice);
        setComputerChoice(computerChoice[0]);
        setResult(result);
        setTotal(total + 1);
        if (result === "Victory!") {
            setWin(win + 1);
        } else if (result === "Tie game!") {
            setTie(tie + 1);
        }
    }

    const getRoundOutcome = (userChoice) => {
        const computerChoice = randomComputerChoice().name;
        console.log(computerChoice, userChoice);
        const userChoiceName = userChoice.name;
        let result;
        if (userChoiceName === 'rock') {
            result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
        }
        if (userChoiceName === 'paper') {
            result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
        }
        if (userChoiceName === 'scissors') {
            result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
        }

        if (userChoiceName === computerChoice) result = 'Tie game!';
        console.log(result);
        return [result, computerChoice];
    };

    const randomComputerChoice = () =>
        CHOICES[Math.floor(Math.random() * CHOICES.length)];

    return (
        <View style={styles.container}>
            <Text style={styles.textResult}>{result}</Text>
            <View style={styles.gameContainer}>
                <ChooseCard name="You" choice={yourChoice} />
                <Text>vs</Text>
                <ChooseCard name="Computer" choice={computerChoice} />
            </View>
            <View style={styles.controlerContainer}>
                {
                    CHOICES.map(choice => (
                        <ButtonController
                            key={choice.name}
                            choice={choice}
                            onPress={onButtonPress} />)
                    )
                }
            </View>
            <View style={styles.reportContainer}>
                <Text>Total: {total}</Text>
                <Text>Win: {win} - {((win / total) * 100).toFixed(2)}%</Text>
                <Text>Defeat: {total - win - tie}  - {((((total - win - tie)) / total) * 100).toFixed(2)}%</Text>
                <Text>Tie: {tie}  - {((tie / total) * 100).toFixed(2)}%</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    textResult: {
        flex: 1,
        fontSize: 22,
        alignSelf: 'center',
        marginTop: 8,
    },
    gameContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#DDD',
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 20,
        paddingBottom: 5
    },
    controlerContainer: {
        flex: 8,
        alignItems: 'center',
    },
    buttonControllerContainer: {
        backgroundColor: 'skyblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportContainer: {
        flex: 2,
        paddingHorizontal: 15
    }
});

export default Homework;
