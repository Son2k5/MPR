import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, ViewStyle, TextStyle 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export  default function List(){
    const[task, setTask] = useState<string>();
    const[taskList, setTaskList] = useState<Task[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [nextId, setNextId] = useState(1);

    useEffect(() =>{
        (async () =>{
            const data = await AsyncStorage.getItem('task');
            if(data) setTaskList(JSON.parse(data));
        })();
    },[])
    useEffect(() => {
        AsyncStorage.setItem('tasks', JSON.stringify(taskList));
    }, [taskList]);
    const addOrUpdateTask =()=>{
        if(!task?.trim()) return;
        if(editingId){
            setTaskList(taskList.map(e => e.id === editingId ? 
                {
                    ...e, text: task
                }:  e ))
            setEditingId(null);
        }else{
            setTaskList([...taskList, {id: nextId.toString(),text: task, completed: false}])
            setNextId(nextId + 1);
        }
        setTask('');

    }
    const deleteTask  = (id : string) =>{
        setTaskList(taskList.filter( e => e.id !== id));
        console.log(id);
    }
    const toggleTask  = (id: string) =>{
        setTaskList(taskList.map( e => e.id === id ? {...e, completed : !e.completed}: e))
    }
    return(
        <View style={styles.container}>
            <Text style={styles.header}>To do List</Text>
            <TextInput style={styles.input} placeholder='Enter task'
            value={task} onChangeText={setTask} />

            <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
                <Text style={styles.btnText} >
                    {editingId ? "Update Task" : "Add Task"}
                </Text>
            </TouchableOpacity>
            <ScrollView style={styles.listArea}   
            >
                {taskList.map(item =>(
                    <View key={item.id} style={styles.item}>
                        <TouchableOpacity style={styles.taskTouch} onPress={() => toggleTask(item.id)}>
                            <Text style={item.completed ? styles.doneText : styles.taskText}>
                                {item.completed ? "V" : ""}{item.text}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.actionBtns}>
                            <TouchableOpacity style={styles.editBtn} onPress={() => { setTask(item.text); setEditingId(item.id); }}>
                                <Text style={styles.btnTextSmall}>EDIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.delBtn} onPress={() => deleteTask(item.id)}>
                                <Text style={styles.btnTextSmall}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#f5f5f5' } as ViewStyle,
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' } as TextStyle,
  input: { backgroundColor: '#fff', padding: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 10, borderRadius: 5 } as TextStyle,
  addButton: { backgroundColor: '#2196F3', padding: 15, alignItems: 'center', marginBottom: 20, borderRadius: 5 } as ViewStyle,
  btnText: { color: '#fff', fontWeight: 'bold' } as TextStyle,
  listArea: { flex: 1 } as ViewStyle,
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', marginBottom: 8, borderRadius: 5 } as ViewStyle,
  taskTouch: { flex: 1 } as ViewStyle,
  taskText: { fontSize: 16 } as TextStyle,
  doneText: { fontSize: 16, textDecorationLine: 'line-through', color: '#aaa' } as TextStyle,
  actionBtns: { flexDirection: 'row' } as ViewStyle,
  editBtn: { backgroundColor: '#FFC107', padding: 8, borderRadius: 4, marginRight: 5 } as ViewStyle,
  delBtn: { backgroundColor: '#F44336', padding: 8, borderRadius: 4 } as ViewStyle,
  btnTextSmall: { color: '#fff', fontSize: 10, fontWeight: 'bold' } as TextStyle,
});