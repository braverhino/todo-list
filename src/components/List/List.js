import React from "react";
import './List.css'

function List({todo, key, deleteTodo, editTodo}) {
  return (
    <div key={key} className='listContainer'>
      <p className="listTodo">{todo.todo}</p>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {/* <button className="listDeletBtn" onClick={() => editTodo(todo.id)}>/</button> */}
        <button className="listDeletBtn" onClick={() => deleteTodo(todo.id)}>x</button>
      </div>
      
    </div>
  );
}

export default List;
