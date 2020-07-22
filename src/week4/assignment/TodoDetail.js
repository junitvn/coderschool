import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { editTodo } from './actions/todoAction';

const TodoDetail = (props) => {
  const [task, setTask] = useState("")
  const dispatch = useDispatch();
  const { item, index } = props.route.params;
  const onEditTask = () => {
    const newItem = {
      text: task,
      completed: item.completed
    }
    dispatch(editTodo(newItem, index))
  }

  return <View>
    <View style={[styles.headerContainer]}>
      <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
        <Ionicons name='arrow-back-outline' style={styles.iconHeader} />
      </TouchableOpacity>
      <Text style={styles.textName}>Edit Task</Text>
    </View>
    <View style={styles.addInputContainer}>
      <TextInput
        placeholder={item.text}
        style={styles.addInput}
        value={task}
        onChangeText={text => setTask(text)} />
      <TouchableOpacity style={styles.addButtonContainer} onPress={onEditTask}>
        <Text style={styles.addText}>Edit</Text>
      </TouchableOpacity>
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
  textName: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8
  },
  iconHeader: {
    color: 'white',
    fontSize: 24
  },
  addInputContainer: {
    marginTop: 8,
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
export default TodoDetail;