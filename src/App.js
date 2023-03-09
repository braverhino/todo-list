import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './App.css';
import TodoApp from './components/TodoApp/TodoApp';
import { auth, db } from './firebase';
import Login from './components/Login/Login';
import { setDoc, doc } from 'firebase/firestore';
import { async } from '@firebase/util';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [isCreateTodolist, setIsCreateTodolist] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, [])

  const register = async () => {
    if(email != '' && password != ''){
      try{
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then(async (response) => await setDoc(doc(db, 'users', response.user.uid), {uid: response.user.uid, email}))
        setEmail('');
        setPassword('')
        setIsCreateTodolist(true)
      } catch(e){
        alert(e)
      }
    }
    
  }
  const login = async () => {
    if(email != '' && password != ''){
      try{
        const currentUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        setUser(currentUser.user)
        setEmail('');
        setPassword('')
      } catch(e){
          alert(e)
      }
      
    }

  }
  const signout = async () => {
    localStorage.removeItem('currentlist')
    await signOut(auth)
    
  }

  return(
    <>
      {
        user ? 
          <TodoApp signOut={() => signout} user={user} isCreateTodolist={isCreateTodolist} setIsCreateTodolist={setIsCreateTodolist}/>
        :
          <Login 
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            login={login}
            register={register}/>
      }
    </>
  )
  
}

export default App;
