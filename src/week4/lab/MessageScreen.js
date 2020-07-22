import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const MessageScreen = (props) => {
    console.log(props.route.params);
    const { item } = props.route.params;
    return <View style={{ flex: 1 }}>
        <View style={[styles.headerContainer]}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                <Ionicons name='arrow-back-outline' style={styles.iconHeader} />
            </TouchableOpacity>
            <Text style={styles.textName}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.inputMessageContainer}>
                <Ionicons name="happy-outline" style={styles.iconSend} />
                <TextInput style={styles.inputText} placeholder="Enter message..."/>
                <Ionicons name="md-paper-plane-sharp" style={styles.iconSend} />
            </View>
        </View>
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
        flexDirection:'row',
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