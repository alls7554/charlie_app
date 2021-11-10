import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
  Modal
} from 'react-native';
import { theme } from '../common/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const STORAGE_KEY = '@toDos'
const STATE_KEY = '@state'

export default function Todo() {

  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [updateKey, setUpdateKey] = useState();
  const [updateText, setUpdateText] = useState('');
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const travel = () => setWorking(false)
  const work = () => setWorking(true)

  const saveState = async () => {
    await AsyncStorage.setItem(STATE_KEY, JSON.stringify(working));
  }
  const loadState = async () => {
    try {
      const s = await AsyncStorage.getItem(STATE_KEY);
      if(s !== null) {
        setWorking(JSON.parse(s));
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onChangeText = payload => {
    if (editing) {
      setUpdateText(payload)
    } else {
      setText(payload);
    }
  };
  const addTodo = async () => {
    if (text === '') {
      return
    }
    // Object.assign({}, todos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newTodos = {
      ...todos,
      [Date.now()]: {
        text, working, done: false
    }}
    setTodos(newTodos);
    await saveTodo(newTodos);
    setText('');
  }
  const saveTodo = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadTodo = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      if(s !== null) {
        setTodos(JSON.parse(s));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const toggleTodo = async (key) => {
    const newTodos = {...todos}
    newTodos[key].done = !todos[key].done
    setTodos(newTodos);
    await saveTodo(newTodos);
  }
  const toggleEditing = (key) => {
    setEditing((prev) => !prev);
    setUpdateKey(key);
    setUpdateText(todos[key].text);
  }
  const updateTodo = async () => {
    const newTodos = {...todos}
    newTodos[updateKey].text = updateText
    console.log(newTodos);
    setTodos(newTodos);
    setEditing(prev =>!prev)
    await saveTodo(newTodos);
  }
  const deleteTodo = async (key) => {
    const newTodos = {...todos}
    delete newTodos[key]
    setTodos(newTodos);
    await saveTodo(newTodos);
    setModalVisible(false);
  }

  useEffect(() => {
    loadState();
    loadTodo();
  }, []);

  useEffect(() => {
    saveState(working);
  }, [working])

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey}}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={addTodo}
        returnKeyType='done'
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
        style={styles.input}
      />
      <ScrollView>{
        loading ?
          (<View>
              <ActivityIndicator color='white' size='large' style={{ marginTop: 20 }}/>
          </View>) :
          (Object.keys(todos).length === 0 ?
            (<View style={styles.nothing}>
              <Entypo name="emoji-sad" size={72} color={theme.grey} />
              <Text style={styles.nothingText}>Nothing...</Text>
            </View>): 
            Object.keys(todos).map(key => (
              todos[key].working === working ?
                editing && updateKey === key ? (
                  <View key={key}>
                    <TextInput
                      value={updateText}
                      onChangeText={onChangeText}
                      onSubmitEditing={updateTodo}
                      returnKeyType='done'
                      autoFocus={true}
                      style={styles.input}
                    />
                  </View>
                ) :
              <View style={styles.todo} key={key}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Delete To do?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonDelete]}
                            onPress={() => deleteTodo(key)}
                          >
                            <Text style={styles.textStyle}>Delete</Text>
                          </TouchableOpacity>
                        </View>  
                      </View>
                    </View>
                  </Modal> 
                <FontAwesome
                  style={styles.todoCheckBox}
                  name={todos[key].done ? 'check-square-o' : 'square-o'}
                  size={24}
                  color={todos[key].done ? theme.grey:"white"}
                  onPress={() => { toggleTodo(key) }}
                />
                <Text style={ todos[key].done ? {...styles.todoText,  textDecorationLine: 'line-through', color:theme.grey }:  styles.todoText}>
                  {todos[key].text}
                </Text>
                <TouchableOpacity style={styles.update} onPress={() => toggleEditing(key)}>
                  <FontAwesome name="pencil" size={24} color={todos[key].done ? theme.grey : 'white'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete} onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesome name="trash" size={24} color={todos[key].done ? theme.grey : 'white'} />  
                </TouchableOpacity>
              </View> : null
          )))
      }</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
    marginVertical: 20,
  },
  nothing: {
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nothingText: {
    color: theme.grey,
    fontSize: 72
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    borderRadius: 10
  },
  todoCheckBox: {
    paddingHorizontal:10
  },
  todoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    width: '70%'
  },
  update: {
    position: 'absolute',
    right: 38
  },
  delete: {
    position: 'absolute',
    right: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    minWidth: 200,
    maxWidth: 220,
    // paddingVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    marginVertical:20,
    elevation: 2
  },
  buttonDelete: {
    backgroundColor: '#DF2525',
  },
  buttonCancel: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 25,
    marginVertical: 20,
    fontSize: 18,
    textAlign: 'center'
  }
})