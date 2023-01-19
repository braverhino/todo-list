import React, { useState } from "react";
import './List.css'
import cancel from '../../assets/multiply.png'
import edit from '../../assets/edit.png'
import accept from '../../assets/accept.png'
import TodoItemInfo from '../TodoItemInfo/TodoItemInfo'

function List({todo, changeStatus}) {
  // const [disabled, setDisabled] = useState(true)
  // const [newtodo, setNewTodo] = useState(todo.todo)
  const [showTodoInfo, setShowTodoInfo] = useState(false);

  return (
    <div className='listContainer'>
      <div style={{
        display: "flex",
        alignItems: 'center',
      }}>
        <input 
          className="checkboxNNN"
          type='checkbox'
          id={todo.id}
           checked={todo.status ? 'checked' : ''}/>
        <label
          className="labelNNN"
          for={todo.id}
          style={todo.status ? {textDecoration: 'line-through solid #fff'} : {textDecoration: 'none'}}
          onClick={() => changeStatus(todo)}>
            {todo.todo}
          
          </label>
          <label className="editBtn" onClick={() => setShowTodoInfo(true)}>
              <img src={edit} width={16} alt='edit icon'/>
          </label>
          {showTodoInfo ? <TodoItemInfo todo={todo} setShowTodoInfo={setShowTodoInfo}/> : ''}
          
         
      </div>
      {/* <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button type="checkbox" onClick={() => setDisabled(!disabled)} style={{backgroundColor: 'transparent', border: 'none', width: '15px', height: '15px'}}>
        {
          disabled ? <img src={accept} width={15}/> : <img src={cancel} width={15}/>
        }
      </button>
      <input
        className={disabled ? "listTodo-disabled" : 'listTodo'}
        value={newtodo}
        onChange={(e) => setNewTodo(e.target.value)}
        disabled={disabled}
      />
      </div> */}
      
      {/* <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}> */}
        {/* {
          disabled ? 
            <label className="listDeletBtn"
              onClick={() => {
                setDisabled(false);

              }}>
                <img src={edit} width={30} alt='edit icon'/>
            </label>
            : 
            <button style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => {
              setDisabled(true)
              if(newtodo !== todo.todo){
                editTodo(todo.id, newtodo)
              }
            }}><img src={accept}  width={30} alt="accept icon"/></button>
        } */}
        
        {/* <button
          className="listDeletBtn"
          onClick={() => deleteTodo(todo.id)}>
            <img src={cancel} width={30} alt="cancel icon"/>
        </button> */}
      {/* </div> */}
    </div>
  );
}

export default List;
