import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ChooseCard = (props) => {
  const {name: playerName, choice} = props;
  const {uri, name} = choice;
  return (
    <View style={styles.cardContainer}>
      <Text>{playerName}</Text>
      <Image
        source={{uri}}
        style={{width: 100, height: 100}}
        resizeMode="cover"
      />
      <Text>{name}</Text>
    </View>
  );
};

const ButtonController = (props) => {
  const {choice} = props;
  const {name} = choice;
  return (
    <TouchableOpacity style={styles.buttonControllerContainer}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const Homework = () => {
  const [yourChoice, setYouChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
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

  return (
    <View style={styles.container}>
      <Text style={styles.textResult}>Homework</Text>
      <View style={styles.gameContainer}>
        <ChooseCard name="You" choice={CHOICES[0]} />
        <Text>vs</Text>
        <ChooseCard name="Computer" choice={CHOICES[2]} />
      </View>
      <View style={styles.controlerContainer}>
        <ButtonController choice={CHOICES[0]} />
        <ButtonController choice={CHOICES[1]} />
        <ButtonController choice={CHOICES[2]} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  controlerContainer: {
    flex: 10,
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
      justifyContent:'center',
      alignItems: 'center',
  },
});

export default Homework;
