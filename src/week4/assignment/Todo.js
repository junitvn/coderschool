import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllTask from './components/AllTask';
import Active from './components/Active';
import Completed from './components/Completed';

const Tab = createBottomTabNavigator();

const Todo = () => {
    return <Tab.Navigator>
        <Tab.Screen name="All Task" component={AllTask}
            options={{
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="chatbubbles-outline" color={color} size={22} />
                    )
                },
            }} />
        <Tab.Screen name="Active" component={Active}
            options={{
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="grid-outline" color={color} size={22} />
                    )
                },
            }} />
        <Tab.Screen name="Completed" component={Completed}
            options={{
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="people-outline" color={color} size={22} />
                    )
                },
            }} />
    </Tab.Navigator>
}

export default Todo;