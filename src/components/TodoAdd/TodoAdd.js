import React from "react";
import { db } from "../../firebase";
import { collection, addDoc, Firestore } from "firebase/firestore";
import './TodoAdd.css';

function TodoAdd({getTodos, name, setName, user, todo, setTodo}) {
  const collectionTodo = collection(db, 'todos')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
        createdAt: Date.now(),
        todo: name,
        uid: user.uid,
        status: false,
    } 
    if(name !== ''){
      setTodo([...todo, payload])
      await addDoc(collectionTodo, payload);
      setName('');
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
          />
          <button type="submit" className="addTodo_button">+</button>
        </div>
          
    </form>
  );
}

export default TodoAdd;
