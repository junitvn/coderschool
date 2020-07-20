import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ItemMessage = (props) => {
    const { name, lastMessage, avatar } = props.item;
    return <TouchableOpacity style={styles.itemContainer} onPress={() => props.onClick(props.item)}>
        <Image source={avatar} style={styles.avatar} resizeMode="cover" />
        <View style={styles.textContainer}>
            <Text style={styles.textName}>{props.item.name}</Text>
            <Text style={styles.textMessage}>{lastMessage}</Text>
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 12,
        paddingBottom: 6,
        justifyContent: 'space-between',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 0.5
    },
    textName: {
        fontSize: 16
    },
    textMessage: {
        fontSize: 13,
        color: 'gray'
    }
})
export default ItemMessage;