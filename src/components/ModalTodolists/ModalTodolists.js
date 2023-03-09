import React from "react";
import './ModalTodolists.css';

function ModalTodolists({todolist, setIsActiveModalTodo, setCurrentTodoList, setIsCreateTodolist, setTodos, currentTodolist}) {
  return (
          <div className="modal" onClick={() => setIsActiveModalTodo(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {
                todolist.sort((a, b) => a.updatedBy - b.updatedBy).map(item => {
                  return(
                    <div 
                    key={item.id}
                    className="todolist-item"
                    onClick={() => {
                      if(currentTodolist.id !== item.id){
                        setCurrentTodoList(item.id)
                        setIsActiveModalTodo(false)
                      }
                    }}>
                      {item.name}
                      {
                        currentTodolist.id === item.id ? <span className="current">*</span> : ''
                      }
                      
                    </div>
                  )
                })
              }
              <button 
                className="create_new_todolist_btn"
                onClick={() => {
                  setTodos([])
                  setIsCreateTodolist(true)
                  setIsActiveModalTodo(false)
                }}>
                Create Todo List
              </button>
            </div>
          </div>
  );
}

export default ModalTodolists;
