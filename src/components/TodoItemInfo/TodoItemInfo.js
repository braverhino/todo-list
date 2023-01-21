import React from "react";
import { useState } from "react";
import './TodoItemInfo.css'
import check from '../../assets/check.png'
import edit from '../../assets/edit.png'
const TodoItemInfo = ({todo, setShowTodoInfo, editTodos, getTodos, currentTodolist, deleteTodo}) => {
    
    const [disabled, setDisabled] = useState(true)
    const [todoName, setTodoName] = useState(todo.todo)
    const [newtodo, setNewTodo] = useState(todo.todo)
    const date= new Date(todo.createdAt);
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let dateFormat =  date.toDateString() + ", " + date.getHours() + ":" + minutes;
    return (
        <div className="todo-modal" onClick={() => setShowTodoInfo(false)}>
            <div className="todo-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="todo-modal-container">
                    <div className="todoData">
                        <span style={{fontStyle: 'italic'}}>Created by:</span> {todo.createdBy}
                    </div>
                    <div className="todoData">
                        {dateFormat}
                    </div>
                    <div className="todoInputBtns">
                        <input className="todoInput" value={todoName} onChange={(e) => setTodoName(e.target.value)} disabled={disabled}/>
                        {
                            disabled ? 
                            <button onClick={() => setDisabled(false)} style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>Edit</button> 
                            : 
                            <span style={{display: 'flex', alignItems: 'center'}}>
                                <button  style={{border: 'none', backgroundColor: 'transparent', borderRadius: '5px', marginRight: '5px'}}
                                    onClick={() => {
                                        if(todoName !== newtodo){
                                            editTodos(todo.id, todoName)
                                            setNewTodo(todoName)
                                            getTodos(currentTodolist)
                                        }
                                        setDisabled(true)
                                }}><img src={check} width={18}/></button>
                                <button style={{border: 'none', backgroundColor: 'red', borderRadius: '5px', color: 'white', marginRight: '5px'}}
                                    onClick={() => {
                                        setTodoName(todo.todo)
                                        setDisabled(true)
                                    }}>X</button>
                            </span>
                            
                        }
                        
                    </div>
                    
                    
                    <button className="todoDeleteBtn"
                    onClick={() => {
                        deleteTodo(todo.id)
                        setShowTodoInfo(false)
                    }}>Delete</button>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default TodoItemInfo;