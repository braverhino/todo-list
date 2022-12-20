import { async } from '@firebase/util';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import TodoAdd from './components/TodoAdd/TodoAdd';
import { db } from './firebase';

function App() {
  const [todo, setTodo] = useState([])
  const [name, setName] = useState('')
  const getTodos = async () => {
    const data = await getDocs(collection(db, 'todos'));
    setTodo(data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })))
  }
  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id);
    deleteDoc(todoDoc).then(() => getTodos())
  }
  // const editTodo = async (id) => {
  //   const todoDoc = doc(db, 'todos', id);
  //   await updateDoc(todoDoc, {todo: 'updated'})
  // }
  useEffect( () => {
     getTodos().catch(err => {
      console.log(err)
    })
  }, []);


  return (
    <div className="App-container">
        <Header/>
        <TodoAdd getTodos={getTodos()} name={name} setName={setName}/>
        {
          todo.map((i) => {
            return (
            <List
              todo={i}
              key={i.id}
              deleteTodo={deleteTodo}
              // editTodo={editTodo}
            />)
          })
        }
      </div>
  );
}

export default App;
