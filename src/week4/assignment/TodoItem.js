import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { toggleTodo } from './actions/todoAction';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TodoItem = (props) => {
  const { item, index, navigation } = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(item.completed)
  console.log('item', item);
  const dispatch = useDispatch();

  const onCheckBoxChangeValue = () => {
    toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)
    dispatch(toggleTodo(index))
  }

  const onItemClick = () => {
    navigation.navigate("TodoDetail", { item, index })
  }

  return <View style={styles.itemContainer}>
    <CheckBox
      disabled={false}
      value={toggleCheckBox}
      onValueChange={onCheckBoxChangeValue}
    />
    <TouchableOpacity onPress={onItemClick}>
      <Text style={[styles.text], toggleCheckBox ? { textDecorationLine: 'line-through' } : {}}>{item.text}</Text>
    </TouchableOpacity>
  </View>
}


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4
  }, text: {
    fontSize: 14,
  }
})

export default TodoItem;