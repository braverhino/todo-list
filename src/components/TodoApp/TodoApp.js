import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, {useEffect, useState} from "react";
import Header from '../Header/Header';
import List from '../List/List';
import TodoAdd from '../TodoAdd/TodoAdd';
import { db } from '../../firebase';
import './TodoApp.css'

const TodoApp = ({signOut, user}) => {
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
  const editTodo = async (id, newtodo) => {
    console.log(id, newtodo)
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, {todo: newtodo})

  }
  useEffect( () => {
     getTodos().catch(err => {
      console.log(err)
    })
  }, []);
  
  return (
    <div className="App-container">
        <Header/>
        <button onClick={signOut()} className={'signOut-btn'}>Sign out</button>
        <br/>
        <TodoAdd getTodos={getTodos()} name={name} setName={setName} user={user}/>
        {
          todo.map((i) => {
            if(user.uid === i.uid){
              return (
                <List
                  todo={i}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
            )
            }
          })
        }
      </div>
  );
}

export default TodoApp;