import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Todo from './Todo';
import TodoDetail from './TodoDetail';

const Stack = createStackNavigator();

const TodoStack = () => <Stack.Navigator screenOptions={{
    headerShown: false
}}
>
    <Stack.Screen name="Todo" component={Todo} />
    <Stack.Screen name="TodoDetail" component={TodoDetail} />
</Stack.Navigator>

export default TodoStack;
