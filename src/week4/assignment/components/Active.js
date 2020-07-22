import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import TodoList from './TodoList';
import { useSelector } from 'react-redux';

const Active = ({navigation}) => {
  const data = useSelector(state => state.todo);
  return <View style={{flex: 1}}>
    <Header backgroundColor="#00a0f8" barStyle='default' name="Active" />
    <View style={{ flex: 1, marginTop: 50, }}>
      <TodoList style={{ flex: 1 }} data={data} type="Active" navigation={navigation} />
    </View>
  </View>
}

export default Active;