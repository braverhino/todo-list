import React from "react";
import './Login.css';

const Login = ({password, setPassword, email, setEmail, register, login}) => {
    
    return (
        <div className="list_form_container">
            <form onSubmit={(e) => e.preventDefault()} className={'list_form'}>
                <label for={'email'} style={{color: 'white'}}>Email address</label>
                <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id={'email'}
                className="login__input"
                />
                <br/>
                <label for={'password'} style={{color: 'white'}}>Password</label>
                <input 
                id={"password"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="login__input"

                />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <button onClick={() => login()} id={'login-btn'} className='login-component-btn'>
                    Log In
                    </button>
                    <button onClick={() => register()} className='login-component-btn' id={'register-btn'}>
                    Sign up
                    </button>
                </div>
                
            </form>
            
          </div>
    )
}

export default Login;