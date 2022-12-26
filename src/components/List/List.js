import React, { useState } from "react";
import './List.css'
import cancel from '../../assets/multiply.png'
import edit from '../../assets/edit.png'
import accept from '../../assets/accept.png'

function List({todo, deleteTodo, editTodo}) {
  const [disabled, setDisabled] = useState(true)
  const [newtodo, setNewTodo] = useState(todo.todo)
  return (
    <div className='listContainer'>
      <input
        className={disabled ? "listTodo-disabled" : 'listTodo'}
        value={newtodo}
        onChange={(e) => setNewTodo(e.target.value)}
        disabled={disabled}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        {
          disabled ? 
            <label className="listDeletBtn"
              onClick={() => {
                setDisabled(false);

              }}>
                <img src={edit} width={30}/>
            </label>
            : 
            <button style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => {
              setDisabled(true)
              if(newtodo !== todo.todo){
                editTodo(todo.id, newtodo)
                alert('changed')
              }
            }}><img src={accept}  width={30}/></button>
        }
        
        <button
          className="listDeletBtn"
          onClick={() => deleteTodo(todo.id)}>
            <img src={cancel} width={30}/>
        </button>
      </div>
    </div>
  );
}

export default List;
