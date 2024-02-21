import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import TodoStore from '../ToDoStore';
import useTodoStore from '../store/toDoStore';
import {
  enterTitle,
  enterdescription,
  cancel,
  add,
} from '../constants/constants';

const CreateTaskScreen = ({navigation, route}) => {
  const {todos, setTodos} = useTodoStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = () => {
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
    const newTodo = {id: Date.now(), title: title, description: description};
    TodoStore.saveTodos([...TodoStore.getTodos(), newTodo]);
    setTodos(TodoStore.getTodos());
    navigation.goBack();
  };

  return (
    <View style={styles.containerTwo}>
      <TextInput
        style={styles.inputTwo}
        placeholder={enterTitle}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputTwo}
        placeholder={enterdescription}
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <Button title={add} onPress={addTodo} />
      <View style={{marginTop: 16}} />
      <Button title={cancel} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CreateTaskScreen;
