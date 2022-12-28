import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './App.css';
import TodoApp from './components/TodoApp/TodoApp';
import { auth } from './firebase';
import Login from './components/Login/Login';
// TODO when add data 
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

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
        )
        setEmail('');
        setPassword('')
      } catch(e){
        alert(e)
      }
      await signout(auth)
    }
    
  }
  const login = async () => {
    if(email != '' && password != ''){
      try{
        console.log(email, password)
        const currentUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log(currentUser);
        setUser(currentUser.user)
        setEmail('');
        setPassword('')
      } catch(e){
          alert(e)
      }
      
    }

  }
  const signout = async () => {
    await signOut(auth)
  }

  return(
    <>
      {
        user ? 
          <TodoApp signOut={() => signout} user={user}/>
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
