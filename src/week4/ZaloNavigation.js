import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Messages from './Messages';
import Contacts from './Contacts';
import Groups from './Groups';
import Timeline from './Timeline';
import More from './More';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MessageScreen from './MessageScreen';

const MessageStack = createStackNavigator();

const MessageStackScreen = () => <MessageStack.Navigator screenOptions={{
    headerShown: false
}}>
    <MessageStack.Screen name="Messages" component={ZaloNavigation} />
    <MessageStack.Screen name="Details" component={MessageScreen} />
</MessageStack.Navigator>

const Tab = createBottomTabNavigator();

const ZaloNavigation = () => {
    return <Tab.Navigator>
        <Tab.Screen name="Messages" component={Messages}
            options={{
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="chatbubbles-outline" color={color} size={22} />
                    )
                },
            }} />
        <Tab.Screen name="Contacts" component={Contacts}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="contacts" color={color} size={22} />
                ),
            }} />
        <Tab.Screen name="Group" component={Groups}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="people-outline" color={color} size={22} />
                ),
            }}
        />
        <Tab.Screen name="Timeline" component={Timeline}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="time-outline" color={color} size={22} />
                ),
            }} />
        <Tab.Screen name="More" component={More}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="grid-outline" color={color} size={21} />
                ),
            }} />
    </Tab.Navigator>
}

export default MessageStackScreen;