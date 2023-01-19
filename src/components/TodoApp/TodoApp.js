import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
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

const TodoApp = ({signOut, user,isCreateTodolist, setIsCreateTodolist}) => {
  const [todolist, setTodolist] = useState([]);
  const [currentTodolist, setCL] = useState([]);
  const [todolistName, setTodolistName] = useState('');
  // const [todo, setTodo] = useState([])
  let tempArray = [];
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [isActiveModalTodo, setIsActiveModalTodo] = useState(false)
  const [isActiveModalUsers, setIsActiveModalUsers] = useState(false)
  
  // const getTodo = async () => {
  //   const data = await getDocs(collection(db, 'todolists'));
  //   setTodo(data.docs.map(doc => ({
  //         ...doc.data(), id: doc.id
  //         })).filter(el => el.uid === user.uid))
  // }
  const getTodolist = async () => {
    const data = await getDocs(collection(db, 'todolists'));
    tempArray.push(...data.docs.map(doc => ({
          ...doc.data(), id: doc.id
          })).filter(el => el.users.indexOf(user.uid) > -1))
    setTodolist( tempArray)
    
  }
  // const deleteTodo = async (id) => {
  //   const newtodos = todo.filter((item) => {
  //     return item.id !== id;
  //   })
  //   setTodo(newtodos);
  //   const todoDoc = doc(db, 'todos', id);
  //   await deleteDoc(todoDoc).catch(err => console.log(err));
    
  // }
  // const editTodo = async (id, newtodo) => {
  //   const todoDoc = doc(db, 'todos', id);
  //   await updateDoc(todoDoc, {todo: newtodo})
  // }
  const changeStatus = async (item) => {
    let updIndex = currentTodolist.todos.findIndex((obj) => obj.id === item.id);
    currentTodolist.todos[updIndex].status = !currentTodolist.todos[updIndex].status;
    
    setCL({...currentTodolist, todos: [...currentTodolist.todos]})
    const todoDoc = doc(db, 'todolists', currentTodolist.id);
    await updateDoc(todoDoc, {todos: [...currentTodolist.todos]})
  }
  const getUsers = async () => {
    const data = await getDocs(collection(db, 'users'))
    setUsers(data.docs.map(doc => doc.data()))
  }
  const addUser = async (id) => {
    const userDoc = doc(db, 'todolists', currentTodolist.id);
    await updateDoc(userDoc, {...currentTodolist, users: [...currentTodolist.users, id]})
    setCL({...currentTodolist, users: [...currentTodolist.users, id]})
  }
  const getCurrentTodoList = async () => {
      await getDoc(doc(db, 'users', user.uid)).then(doc => {
        let currentlist = [...tempArray].filter(el => el.id === doc.data().currentlistId);
        setCL({...currentlist[0]})
      })
    
  } 
  const setCurrentTodoList = async (id, list) => {
    const userDoc = doc(db, 'users', user.uid);
    await updateDoc(userDoc, {currentlistId: id, currentlist: list})
    let currentlist = [...todolist].filter(el => el.id === id);
    setCL({...currentlist[0]})
  }
  useEffect(() => {
    getTodolist()
    // getTodo().catch(err => {
    //   console.log(err)
    // })
    getCurrentTodoList()
    getUsers()
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
              setIsCreateTodolist={setIsCreateTodolist}/>
        </div>
        :
        todolist.length > 0 ?
        <>
          <Header header={currentTodolist.name}/>
          <div className='main-buttons'>
            <button className='action-btn' onClick={() => setIsActiveModalTodo(true)}><img src={layers} width={25}/></button>
            {
              currentTodolist.createdBy === user.uid ?
              <button className='action-btn' onClick={() => setIsActiveModalUsers(true)}><img src={addUserIcon} width={25}/></button>
              : ''
            }
            
            <button onClick={signOut()} className={'signOut-btn'}>Sign out</button>
          </div>
          {isActiveModalTodo ? <ModalTodolists setCurrentTodoList={setCurrentTodoList} todolist={todolist} isActiveModalTodo={isActiveModalTodo} setIsActiveModalTodo={setIsActiveModalTodo} setIsCreateTodolist={setIsCreateTodolist}/> : ''}
          {isActiveModalUsers ? <ModalUsers setCurrentTodoList={setCurrentTodoList} currentTodolist={currentTodolist} todolist={todolist} currentUser={user} setIsActiveModalUsers={setIsActiveModalUsers} users={users} addUser={addUser}/> : ''}
          <br/>
          <TodoAdd  name={name} setName={setName} user={user} currentTodolist={currentTodolist} setCL={setCL}/>
          <div style={{height: '40vh', overflowY: 'scroll'}}>
            {
              [...currentTodolist.todos]
              .sort((a, b) => b.createdAt - a.createdAt)
              .sort((a, b) => a.status - b.status)
              .map((i) => {
                  return (
                    <div key={i.id}>
                      <List
                        todo={i}
                        changeStatus={changeStatus}
                      />
                    </div>
                )
              })
            }
          </div>
        </>
        : <div>Loading...</div>
      }
        
      </div>
  );
}

export default TodoApp;