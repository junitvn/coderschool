import React from 'react';
import { View, StatusBar, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const Header = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
        <View style={[styles.headerContainer, { backgroundColor }]}>
            <Ionicons name='search-outline' style={styles.iconHeader} />
            <TextInput style={styles.inputSearch} placeholder="Search friends, messages..." placeholderTextColor='white'/>
            <Ionicons name='add' style={styles.iconHeader} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    },
    headerContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 8
    },
    iconHeader: {
        color: 'white',
        fontSize: 24
    },
    inputSearch: {
        width: '80%',
        color: 'white'
    }
})
export default Header;