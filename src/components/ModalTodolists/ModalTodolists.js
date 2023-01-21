import React from "react";
import './ModalTodolists.css';

function ModalTodolists({todolist, setIsActiveModalTodo, setCurrentTodoList, setIsCreateTodolist, setTodos}) {
  return (
          <div className="modal" onClick={() => setIsActiveModalTodo(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {
                todolist.sort((a, b) => a.updatedBy - b.updatedBy).map(item => {
                  return(
                    <div 
                    className="todolist-item"
                    onClick={() => {
                      setCurrentTodoList(item.id, item.name)
                      setIsActiveModalTodo(false)
                    }}>
                      {item.name}
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
