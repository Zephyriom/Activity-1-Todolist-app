import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react'; 
import { IconButton } from "react-native-paper";
import Fallback from "./components/Fallback";


const TodolistScreen = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

    const handleAddTodo = () => {
        if (todo === "") {
            return; // early return if the input is empty
        }
        setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
        setTodo("");
    };

    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((item) => item.id !== id);
        setTodoList(updatedTodoList);
    };

    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item) => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todo };
            }
            return item;
        });
        setTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo("");
    };

    const handleEditTodo = (todo) => {
        setEditedTodo(todo);
        setTodo(todo.title);
    };

    const handleDeleteAll = () => {
        setTodoList([]); // Clear the todo list
        setTodo(""); // Clear the input text
    };
    

    const renderTodos = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: "#419197",
                paddingHorizontal: 16, 
                borderRadius: 8,
                paddingVertical: 12,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#78D6C6",
            }}>
                <Text style={{ color: "#ffff", fontSize: 18, fontWeight: "800", flex: 1 }}>
                    {item.title}
                </Text>
                <IconButton icon="pencil" iconColor="#fff" onPress={() => handleEditTodo(item)} />
                <IconButton icon="trash-can" iconColor="#fff" onPress={() => handleDeleteTodo(item.id)} />
            </View>
        );
    };

    return (
        
<View style={{ marginHorizontal: 16, }}>
    <Text style={{
        paddingVertical: 12,
        paddingHorizontal: 16, 
        paddingTop: 60,
        fontSize: 40,
        fontWeight: "900",
        fontFamily: 'Roboto'
    }}>
        <Text style={{ color: 'white' }}>    🗃</Text>
        <Text style={{ color: '#F6635C' }}> ToDo</Text>
        <Text style={{ color: 'green' }}>lists</Text>
        
    </Text>
            
            <TextInput style={{
                borderWidth: 2,
                borderColor: "#1F1717",
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16, 
            }}
                placeholder='Add a Task'
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            <View style={{ flexDirection: 'row' }}>
                {editedTodo ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#64CCC5",
                            borderRadius: 6,
                            marginVertical: 24,
                            paddingVertical: 8,
                            alignItems: "center",
                            flex: 1,
                            marginRight: 10,
                        }}
                        onPress={handleUpdateTodo}
                    >
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#1AACAC",
                            borderRadius: 6,
                            marginVertical: 24,
                            paddingVertical: 8, 
                            paddingHorizontal: 90, 
                            alignItems: "center",
                            flex: 1,
                            marginRight: 10,
                        }}
                        onPress={handleAddTodo}
                    >
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                            +
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={{
                        backgroundColor: "#F99417",
                        borderRadius: 80,
                        marginVertical: 24,
                        paddingVertical: 8,
                        alignItems: "center",
                        flex: 1,
                    }}
                    onPress={handleDeleteAll}
                >
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20
                    }}>
                        CLEAR
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList data={todoList} renderItem={renderTodos}  />
            {todoList.length <= 0 && <Fallback />}
        </View>
    );
}

export default TodolistScreen;
