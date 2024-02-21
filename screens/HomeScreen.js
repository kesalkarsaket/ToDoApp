import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodoStore from '../ToDoStore';
import useTodoStore from '../store/toDoStore';
import {Delete, createTask, task} from '../constants/constants';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const {todos, setTodos} = useTodoStore();
  const [data, setData] = useState(TodoStore.getTodos());
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    setData(TodoStore.getTodos());
  }, []);

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    TodoStore.saveTodos(newTodos);
    setTodos(newTodos);
  };

  const toggleComplete = id => {
    setSelectedTaskId(id === selectedTaskId ? null : id);
  };

  const renderTodoItem = ({item}) => {
    const isCompleted = item.id === selectedTaskId;
    const backgroundColor = isCompleted ? '#c1ffb6' : '#fffdd0';
    const rightContent = (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteText}>{Delete}</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={() => rightContent}>
        <TouchableOpacity
          style={[styles.todoItem, {backgroundColor}]}
          onPress={() => toggleComplete(item.id)}>
          <Text style={styles.todoTitle}>{item.title}</Text>
          <Text style={styles.todoDescription}>{item.description}</Text>
          <Button
            title="Edit"
            onPress={() => {
              navigation.navigate('EditTask', {todo: item});
            }}
          />
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#F2D2BD'}}>
      <View style={styles.container}>
        <Text style={styles.title}>{task}</Text>
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTodoItem}
        />
        <View style={{marginTop: 20}}>
          <Button
            title={createTask}
            onPress={() => navigation.navigate('CreateTask')}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
