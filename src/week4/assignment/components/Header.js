import React from 'react';
import { View, StatusBar, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const Header = ({ backgroundColor, ...props }) => {
    const { onAddClick } = props;
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
            <View style={[styles.headerContainer, { backgroundColor }]}>
                <TouchableOpacity onPress={() => { console.log("Click menu"); }}>
                    <Ionicons name='menu-outline' style={styles.iconHeader} />
                </TouchableOpacity>
                <Text style={styles.textTitleNav}>{props.name}</Text>
                {props.name === "Todo List" ? <TouchableOpacity onPress={() => onAddClick()}>
                    <Ionicons name='add' style={styles.iconHeader} />
                </TouchableOpacity> : <View />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    },
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    iconHeader: {
        color: 'white',
        fontSize: 26
    },
    textTitleNav: {
        width: '85%',
        color: 'white',
        marginStart: 10,
        fontSize: 19
    }
})
export default Header;