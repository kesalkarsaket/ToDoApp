import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import TodoStore from '../ToDoStore';
import useTodoStore from '../store/toDoStore';
import {
  cancel,
  enterTitle,
  enterdescription,
  save,
} from '../constants/constants';
import styles from './styles';

const EditTaskScreen = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoId, setTodoId] = useState(null);
  const {todos, setTodos} = useTodoStore();

  useEffect(() => {
    const {title, description, id} = route.params.todo;
    setTodoId(id);
    setTitle(title);
    setDescription(description);
  }, [route.params?.todo]);

  const editTodo = () => {
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
    const updatedTodo = {
      id: todoId,
      title: title,
      description: description,
    };
    TodoStore.updateTodos(updatedTodo);
    setTodos(TodoStore.getTodos());
    navigation.goBack();
  };

  return (
    <View style={styles.containerNew}>
      <TextInput
        style={styles.inputNew}
        placeholder={enterTitle}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.inputNew, {height: 100}]}
        placeholder={enterdescription}
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <Button title={save} onPress={editTodo} />
      <Button title={cancel} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default EditTaskScreen;
