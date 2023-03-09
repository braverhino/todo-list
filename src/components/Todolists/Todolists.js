import React from "react";
import './Todolists.css';

function Todolists({todolist, setCurrentTodoList}) {
  return (
          <div className="modal_container">
            <h1 className="modal_container__header">Choose your working todolist</h1>
            <div className="modal-content">
              {
                todolist.sort((a, b) => a.updatedBy - b.updatedBy).map(item => {
                  return(
                    <div 
                    key={item.id}
                    className="todolist-item"
                    onClick={() => {
                        setCurrentTodoList(item.id)
                    }}>
                      {item.name}
                    </div>
                  )
                })
              }
            </div>
          </div>
  );
}

export default Todolists;
