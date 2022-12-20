import React from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import './TodoAdd.css';

function TodoAdd({getTodos, name, setName}) {
  const collectionTodo = collection(db, 'todos')
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(name != ''){
      await addDoc(collectionTodo, {
        todo: name,
        status: false,
      }).then(() => setName(''))
      .then(() => getTodos);
    }
    
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
