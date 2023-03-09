import { doc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import './CreateTodoList.css';

function CreateTodoList({user, todolist,  setTodolist, todolistName, setTodolistName, setCurrentTodoList, setIsCreateTodolist}) {
  let listId = user.uid + Date.now()
  let payload = {
    id: listId,
    createdAt: Date.now(),
    createdBy: user.uid,
    name: todolistName,
    users: [user.uid],
  }
  // 1. New user()
  // 2. Old user()
  const createTodolist = async (e) => {
    e.preventDefault();
    if(todolistName){
      await setDoc(doc(db, 'todolists', listId), payload)
      setTodolist([...todolist, payload]) // get todolists and add new one
      setTodolistName('') // clear input for new todolist
      setCurrentTodoList(payload) // update currect todo list
      setIsCreateTodolist(false) //close window for creating
      localStorage.setItem('currentlist', window.btoa(JSON.stringify(payload))) // add to storage
    }
  }
  return (
    <form className="createContainer" onSubmit={(createTodolist)}>
      <label for="todolist-name-input">Enter name for Todo List</label>
      <input
        id="todolist-name-input" 
        className="todolist-name-input" 
        autoFocus
        value={todolistName}
        onChange={e => setTodolistName(e.target.value)}
      />
      <button className="todolist-name-btn" type="submit">Create</button>
    </form>
  );
}

export default CreateTodoList;
