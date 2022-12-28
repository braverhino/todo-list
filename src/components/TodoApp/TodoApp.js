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
    const newtodos = todo.filter((item) => {
      console.log(item.todo + '(' , item.id, ')', '|', id);
      return item.id !== id;
    })
    setTodo(newtodos);
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc).catch(err => console.log(err));
    
  }
  const editTodo = async (id, newtodo) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, {todo: newtodo})
  }
  useEffect( () => {
      getTodos().catch(err => {
      console.log(err)
    })
  }, []);
  const sortedTodo = [...todo].sort((a, b) => b.createdAt - a.createdAt);
  console.log(todo);
  return (
    <div className="App-container">
        <Header/>
        <button onClick={signOut()} className={'signOut-btn'}>Sign out</button>
        <br/>
        <TodoAdd getTodos={getTodos} name={name} setName={setName} user={user} setTodo={setTodo} todo={todo}/>
        {
          sortedTodo.map((i) => {
            console.log(user.uid, i.uid);
            if(user.uid === i.uid){
              return (
                <div key={i.id}>
                  <List
                    todo={i}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                </div>
                  
                
            )
            }
          })
        }
      </div>
  );
}

export default TodoApp;