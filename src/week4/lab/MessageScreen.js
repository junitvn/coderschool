import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat';

const MessageScreen = (props) => {
    const { item } = props.route.params;
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return <View style={{ flex: 1 }}>
        <View style={[styles.headerContainer]}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                <Ionicons name='arrow-back-outline' style={styles.iconHeader} />
            </TouchableOpacity>
            <Text style={styles.textName}>{item.name}</Text>
        </View>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 2,
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: "#00a0f8",
    },
    iconHeader: {
        color: 'white',
        fontSize: 24
    },
    iconSend: {
        color: '#00a0f8',
        fontSize: 24
    },
    textName: {
        fontSize: 16,
        color: 'white',
        marginLeft: 8
    },
    inputMessageContainer: {
        height: 50,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    inputText: {
        width: '80%',
        color: 'white'
    }
})
export default MessageScreen;