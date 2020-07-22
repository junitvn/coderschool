import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './Header';
import TodoList from './TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../actions/todoAction';




const AllTask = ({ navigation }) => {
  const [isShowAddInput, setIsShowAddInput] = useState(false)
  const [task, setTask] = useState("")
  const data = useSelector(state => state.todo);
  const dispatch = useDispatch();
  const onAddClick = () => {
    setIsShowAddInput(!isShowAddInput)
  }

  const onAddTask = () => {
    dispatch(addTodo(task))
  }

  return <View style={{ flex: 1 }}>
    <Header backgroundColor="#00a0f8" barStyle='default' name="Todo List" onAddClick={onAddClick} />
    {isShowAddInput ? <View style={styles.addInputContainer}>
      <TextInput
        placeholder="Enter task..."
        style={styles.addInput}
        onChangeText={text => setTask(text)} />
      <TouchableOpacity style={styles.addButtonContainer} onPress={onAddTask}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View> : <View />}
    <View style={[{ flex: 1 }, isShowAddInput ? { marginTop: 0 } : { marginTop: 50 }]}>
      <TodoList style={{ flex: 1 }} data={data} type="All" navigation={navigation} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  addInputContainer: {
    marginTop: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  addInput: {
    width: '82%',
    borderColor: 'skyblue',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15
  },
  addButtonContainer: {
    backgroundColor: '#00a0f8',
    justifyContent: 'center',
    borderRadius: 15
  },
  addText: {
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16
  }
})

export default AllTask;