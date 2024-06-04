import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultTodoList = [];

console.log(defaultTodoList)

const TODO_LIST_KEY = "TODO_LIST_KEY"

export const useTodoList = (selectedDate) =>{
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

  const saveTodoList =  (newTodoList) => {
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList))
  }

  const addTodo = () => {
    const len = todoList.length; // 3
    console.log("len",len)
    const lastId = len === 0 ? 0 : todoList[len - 1].id;
    console.log("last_id", lastId)
    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      }
    ]
    console.log("newTodoList", newTodoList)
    setTodoList(newTodoList); // 현재 화면에 보여지는 List에도 넣고, 저장고에도 넣고
    saveTodoList(newTodoList);
  }
  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(newTodoList)
    saveTodoList(newTodoList)
  }

  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      }
    });
    setTodoList(newTodoList);
    saveTodoList(newTodoList)
  }

  const resetInput = () => setInput("");

  const filteredTodoList = todoList.filter(todo => dayjs(todo.date).isSame(selectedDate, "date"))

  useEffect(() => {
    init();
  }, []); 

  const init = async () => { // 프로그램을 시작할 때 처음이자 마지막으로 실행되는 함수
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);
    // console.log('result', typeof result, result); // 현재 저장고에 들어있는 값들 출력
    if(result) {
      const newTodoList = JSON.parse(result) // 저장고에 넣을 때 전부 String으로 저장했기 때문에 Parse를 통해 다시 원래대로 돌려주는 작업 필요
      // console.log('newTodoList', typeof newTodoList, newTodoList);
      setTodoList(newTodoList)
    }
  }

  return {
    todoList,
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  }
}