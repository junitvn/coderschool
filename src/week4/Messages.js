import React from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import Header from './Header';
import ItemMessage from './ItemMessage';

const onItemClick = (item) => {
    const { navigation } = Messages.props;
    navigation.navigate("Details", { item });
}

const renderItem = ({ item, index }) => <ItemMessage item={item} onClick={onItemClick} />

const data = [
    {
        name: "Jonathan",
        lastMessage: "Okela",
        avatar: require("../assets/avatar1.jpg")
    },
    {
        name: "Emily",
        lastMessage: "Okela",
        avatar: require("../assets/avatar2.jpg")
    },
    {
        name: "Obama",
        lastMessage: "Okela",
        avatar: require("../assets/avatar3.jpg")
    },
    {
        name: "Craacker",
        lastMessage: "Okela",
        avatar: require("../assets/avatar4.jpg")
    },
    {
        name: "Linh Anh",
        lastMessage: "Okela",
        avatar: require("../assets/avatar5.jpg")
    },
    {
        name: "Dieu Linh",
        lastMessage: "Okela",
        avatar: require("../assets/avatar6.jpg")
    },
    {
        name: "Huyen Trang",
        lastMessage: "Okela",
        avatar: require("../assets/avatar7.jpg")
    },
    {
        name: "Huong",
        lastMessage: "Okela",
        avatar: require("../assets/avatar8.jpg")
    },
    {
        name: "Ngoc",
        lastMessage: "Okela",
        avatar: require("../assets/avatar9.jpg")
    },
    {
        name: "Nhi",
        lastMessage: "Okela",
        avatar: require("../assets/avatar1.jpg")
    },
    {
        name: "Ngoc Han",
        lastMessage: "Okela",
        avatar: require("../assets/avatar2.jpg")
    },
    {
        name: "Ngo Thi Thao",
        lastMessage: "Okela",
        avatar: require("../assets/avatar3.jpg")
    },
]

const Messages = (props) => {
    const { navigation } = props;
    Messages.props = props;
    return <View style={{ flex: 1, backgroundColor: 'white', }}>
        <Header backgroundColor="#00a0f8" barStyle='default' />
        <View style={{ flex: 1, marginTop: 50 }}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    </View>
}


export default Messages;