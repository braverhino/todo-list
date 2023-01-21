import React from "react";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import './TodoAdd.css';

function TodoAdd({name, setName, user, currentTodolist, setTodos, todos}) {
  let todoid = currentTodolist.id + Date.now()
  const todoDoc = doc(db, 'todos', todoid)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
        id: todoid,
        createdAt: Date.now(),
        todolist: currentTodolist.id,
        todo: name,
        uid: user.uid,
        createdBy: user.email,
        status: false,
    } 
    if(name !== ''){
      await setDoc(todoDoc, payload);
      setName('');
      setTodos([...todos, payload])
    }
    
  }
  
  return (
    <form onSubmit={handleSubmit}>
        <div className="form_container">
          <input 
            type={"text"}
            placeholder="Enter todo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="addTodo_input"
            autoFocus
          />
          <button type="submit" className="addTodo_button">+</button>
        </div>
          
    </form>
  );
}

export default TodoAdd;
