import React from "react";
import './ModalUsers.css';

function ModalUsers({users, currentTodolist, setIsActiveModalUsers, addUser}) {
  return (
    /* <select onChange={(e) => {
            let index = e.target.selectedIndex;
            setCurrentTodoList(e.target.options[index].getAttribute('data-key'), e.target.value)
          }}>
            {
              todolist.sort((a, b) => a.updatedBy - b.updatedBy).map(list => {
                return(
                  <MyList currentTodolist={currentTodolist} list={list}/>
                )
              })
            }
          </select> */
          <div className="modal" onClick={() => setIsActiveModalUsers(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {
                users.filter(el => !currentTodolist.users.includes(el.uid)).length > 0 ?
                users.filter(el => !currentTodolist.users.includes(el.uid))
                .map(user => {
                  return(
                    <div className="userlist-item" onClick={() => {
                      addUser(user.uid)
                      setIsActiveModalUsers(false)
                    }}>{user.email}</div>
                  )
                })
                : <div>No available users</div>
              }
            </div>
          </div>
  );
}

export default ModalUsers;
