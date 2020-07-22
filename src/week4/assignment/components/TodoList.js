import React from 'react';
import { View, Text, FlatList } from 'react-native';
import TodoItem from '../TodoItem';

const TodoList = (props) => {
  const data = props.data;
  const { navigation } = props;
  const isShowActive = props.type === "Active";
  const filterTodos = data.todos.filter(item => item.completed != isShowActive);
  const todoData = props.type === "All" ? data.todos : filterTodos
  const renderItem = ({ item, index, sperators }) => <TodoItem item={item} index={index} navigation={navigation} />

  return <View style={{ flex: 1 }}>
    <FlatList
      data={todoData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  </View>
}

export default TodoList;