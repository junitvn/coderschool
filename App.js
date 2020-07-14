import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/Home';
import CurrencyConvert from './src/week3/CurrencyConvert';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Week 3" component={CurrencyConvert} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;