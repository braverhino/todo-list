import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc, where, query, onSnapshot } from 'firebase/firestore';
import React, {useEffect, useState} from "react";
import Header from '../Header/Header';
import List from '../List/List';
import TodoAdd from '../TodoAdd/TodoAdd';
import CreateTodoList from '../CreateTodoList/CreateTodoList';
import ModalTodolists from '../ModalTodolists/ModalTodolists';
import ModalUsers from '../ModalUsers/ModalUsers';
import layers from '../../assets/layers.png'
import addUserIcon from '../../assets/2d03bfee19950049eaa0a116e156abe7.svg'
import { db } from '../../firebase';
import './TodoApp.css'
import Todolists from '../Todolists/Todolists';

const TodoApp = ({signOut, user,isCreateTodolist, setIsCreateTodolist}) => {
  const [todolist, setTodolist] = useState([]);
  const [currentTodolist, setCL] = useState([]);
  const [todolistName, setTodolistName] = useState('');
  const [todos, setTodos] = useState([])
  let tempArray = [];
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [isActiveModalTodo, setIsActiveModalTodo] = useState(false)
  const [isActiveModalUsers, setIsActiveModalUsers] = useState(false)
  
  const deleteTodo = async (id) => {
    const newtodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newtodos);
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc).catch(err => console.log(err));
  }
  const editTodos = async (id, newtodo) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, {todo: newtodo})
  }
  const getTodos = (currentlist) => {
    const q = query(collection(db, 'todos'), where('todolist', '==', currentlist.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let todosArray = [];
      snapshot.docs.forEach((doc) => {
         todosArray.push({...doc.data()})
      })
      setTodos(todosArray)
    })
    return() => {
      alert('unsubscribe')
      unsubscribe()
    }
  }
  const changeStatus = async (item) => {
    console.log('5');
    let updIndex = todos.findIndex((obj) => obj.id === item.id);
    todos[updIndex].status = !todos[updIndex].status;
    setTodos([...todos])
    const todoDoc = doc(db, 'todos', item.id);
    await updateDoc(todoDoc, {status: todos[updIndex].status})
    
  }
  const getUsers = async () => {
    console.log('6');
    const data = await getDocs(collection(db, 'users'))
    setUsers(data.docs.map(doc => doc.data()))
  }
  const addUser = async (id) => {
    console.log('7');
    const userDoc = doc(db, 'todolists', currentTodolist.id);
    await updateDoc(userDoc, {...currentTodolist, users: [...currentTodolist.users, id]})
    setCL({...currentTodolist, users: [...currentTodolist.users, id]})
  }
  const getCurrentTodoList = async () => {
    if(localStorage.getItem('currentlist') && localStorage.getItem('currentlist') !== 'dW5kZWZpbmVk'){
      let currentlist = JSON.parse(window.atob(localStorage.getItem('currentlist')))
      setCL(currentlist)
      getTodos(currentlist)
    }
    else{
      setCL({})
    }
  } 
  const setCurrentTodoList = async (id) => {
    let currentlist = todolist.filter(el => el.id === id);
    console.log(currentlist[0]);
    localStorage.setItem('currentlist', window.btoa(JSON.stringify(currentlist[0])))
    setCL({...currentlist[0]})
    getTodos(currentlist[0])
  }
  useEffect(() => {
    const q =  query(collection(db, "todolists"), where('users', 'array-contains', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let temp = []
      snapshot.forEach((userSnapshot) => {
        temp.push({...userSnapshot.data()});
      });
      setTodolist(temp)
    }, (error) => console.error(error));
    getCurrentTodoList();

    return () => {
      alert('QWERTY')
      unsubscribe();
    };
  }, []);
  return (
    <div className="App-container">
      {
        isCreateTodolist ? 
        <div>
            <CreateTodoList 
              todolist={todolist} 
              setTodolist={setTodolist}
              user={user}
              todolistName={todolistName} 
              setTodolistName={setTodolistName}
              setCurrentTodoList={setCL}
              setIsCreateTodolist={setIsCreateTodolist}
              tempArray={tempArray}/>
        </div>
        :
        todolist.length > 0 ?
        Object.keys(currentTodolist).length !== 0 ? 
        <>
          <Header header={currentTodolist.name}/>
          <div className='main-buttons'>
            <button className='action-btn' onClick={() => setIsActiveModalTodo(true)}><img src={layers} width={25}/></button>
            {
              currentTodolist.createdBy === user.uid ?
              <button className='action-btn' onClick={() => {
                getUsers()
                setIsActiveModalUsers(true)
              }}><img src={addUserIcon} width={25}/></button>
              : ''
            }
            
            <button onClick={signOut()} className={'signOut-btn'}>Sign out</button>
          </div>
          {isActiveModalTodo ? <ModalTodolists 
            setCurrentTodoList={setCurrentTodoList}
            todolist={todolist}
            setIsActiveModalTodo={setIsActiveModalTodo}
            setIsCreateTodolist={setIsCreateTodolist}
            setTodos={setTodos}
            currentTodolist={currentTodolist}/> : ''}
            
          {isActiveModalUsers ? <ModalUsers
            currentTodolist={currentTodolist}
            setIsActiveModalUsers={setIsActiveModalUsers}
            users={users}
            addUser={addUser}/> : ''}
          <br/>
          <TodoAdd  name={name} setName={setName} user={user} currentTodolist={currentTodolist} setTodos={setTodos} todos={todos}/>
          <div style={{height: '40vh', overflowY: 'scroll'}}>
            {
              todos
              .sort((a, b) => b.createdAt - a.createdAt)
              .sort((a, b) => a.status - b.status)
              .map((i) => {
                  return (
                    <div key={i.id}>
                      <List
                        todo={i}
                        changeStatus={changeStatus}
                        editTodos={editTodos}
                        deleteTodo={deleteTodo}
                        currentTodolist={currentTodolist}
                      />
                    </div>
                )
              })
            }
          </div>
        </>
        : 
          <Todolists
            setCurrentTodoList={setCurrentTodoList}
            todolist={todolist}/> 
        : <div>Loading...</div>
      }
        
      </div>
  );
}

export default TodoApp;