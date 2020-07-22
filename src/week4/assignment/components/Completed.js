import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import TodoList from './TodoList';
import { useSelector } from 'react-redux';

const Completed = ({ navigation }) => {
  const data = useSelector(state => state.todo);
  return <View style={{ flex: 1 }}>
    <Header backgroundColor="#00a0f8" barStyle='default' name="Completed" />
    <View style={{ flex: 1, marginTop: 50, }}>
      <TodoList style={{ flex: 1 }} data={data} type="Completed" navigation={navigation} />
    </View>
  </View>
}

export default Completed;