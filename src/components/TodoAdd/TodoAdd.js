import React from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import './TodoAdd.css';

function TodoAdd({getTodo, name, setName, user, currentTodolist, setCL, todos}) {
  const todoDoc = doc(db, 'todolists', currentTodolist.id)
  let todoid = user.uid + Date.now()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
        id: todoid,
        createdAt: Date.now(),
        todo: name,
        uid: user.uid,
        createdBy: user.email,
        status: false,
    } 
    if(name !== ''){
      await updateDoc(todoDoc, {...currentTodolist, todos: [...currentTodolist.todos, payload]});
      setCL({...currentTodolist, todos: [...currentTodolist.todos, payload]})
      setName('');
      getTodo()
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
