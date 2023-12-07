import { useState, useRef } from 'react';
import axios from 'axios';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef('');
  const password = useRef('');
  const [errorMessage , setErrorMessage] = useState('');
  const [isLoading , setIsLoading] = useState(false);
  
  const formSubmitHandler = async (e) =>{
    e.preventDefault();
    if(isLogin){
      
        setIsLoading(prevState => !prevState);
        const userDetails= {
          email:email.current.value,
          password:password.current.value,
          returnSecureToken:true
        }
        
        console.log(userDetails)
        try{
          const response= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt2ecAeK0i9mf459d0hG17C6BkFx7Gngk',
        userDetails);
          console.log(response);
          
          setIsLogin((prevState) => !prevState);
        }
        catch(err){
          setErrorMessage(err.response.data.error.message)
        }
        setIsLoading(prevState => !prevState);
      
      
    
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{!isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={email} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            ref ={password}
            id='password'
            required
          />
        </div>
        {isLoading && <p style={{color:"white"}}>Sending request...</p>}
        <div className={classes.actions}>
          <button
            type='submit'
            className={classes.toggle}

          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        <p style={{color:"red"}}>{errorMessage}</p>
      </form>
    </section>
  );
};

export default AuthForm;
