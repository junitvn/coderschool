import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/Home';
import CurrencyConvert from './src/week3/CurrencyConvert';
import Homework from './src/week3/Homework';
import MessageStackScreen from './src/week4/lab/ZaloNavigation';
import Root from './src/week4/assignment';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Todo">
        <Drawer.Screen name="Week 3" component={CurrencyConvert} />
        <Drawer.Screen name="Homework 3" component={Homework} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Zalo" component={MessageStackScreen} />
        <Drawer.Screen name="Todo" component={Root} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;