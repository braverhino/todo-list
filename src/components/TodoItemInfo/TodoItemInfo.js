import React from "react";
import { useState } from "react";
import './TodoItemInfo.css'
const TodoItemInfo = ({todo, setShowTodoInfo}) => {
    
    const [disabled, setDisabled] = useState(true)
    const [todoName, setTodoName] = useState(todo.todo)
    const [newtodo, setNewTodo] = useState(todo.todo)
    const date= new Date(todo.createdAt);
    let dateFormat =  date.toDateString() + ", " + date.getHours() + ":" + date.getMinutes();
    return (
        <div className="todo-modal" onClick={() => setShowTodoInfo(false)}>
            <div className="todo-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="todo-modal-container">
                    <div>
                        Created by: {todo.createdBy}
                    </div>
                    <div>
                        {dateFormat}
                    </div>

                    <input value={todoName} onChange={(e) => setTodoName(e.target.value)} disabled={disabled}/>
                    {
                        disabled ? 
                        <button onClick={() => setDisabled(false)}>Edit</button> 

                        : 
                        <div>
                            <button onClick={() => {
                                setDisabled(true)
                            }}>Save</button>
                            <button onClick={() => {
                                    setTodoName(todo.todo)
                                    setDisabled(true)

                                }}>Cancel</button>
                        </div>
                        
                    }
                    <div>
                        <button>Delete</button>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default TodoItemInfo;