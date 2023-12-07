import { useState, useRef , useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import classes from './AuthForm.module.css';
import LoginContext from '../Store/loginContext';
const AuthForm = () => {
  const loginCtx = useContext(LoginContext);
  const email = useRef('');
  const password = useRef('');
  const [errorMessage , setErrorMessage] = useState('');
  const [isLoading , setIsLoading] = useState(false);
  const [isLogin ,setIsLogin] = useState(false);
  const history = useHistory();
  const formSubmitHandler = async (e) =>{
    e.preventDefault();
    const userDetails= {
      email:email.current.value,
      password:password.current.value,
      returnSecureToken:true
    }
    // console.log(loginCtx.loggedIn)
    setIsLoading(prevState => !prevState);
    if(!isLogin){
      
                
        try{
          const response= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.REACT_APP_API_KEY,
        userDetails);
          console.log(response);
          setErrorMessage('');
        }
        catch(err){
          setErrorMessage(err.response.data.error.message);
        }
        
        setIsLogin(!isLogin)
    }
    else{
     try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.REACT_APP_API_KEY,
      userDetails);
      console.log(response);
      setErrorMessage('Login successful');
      const token = response.data.idToken
      localStorage.setItem('token' , token);
      loginCtx.login(token);
      history.push('/profile');
      
     } catch (error) {
      setErrorMessage(error.response.data.error.message);
      console.log(error)
     }
    }
    setIsLoading(prevState => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
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
            {!isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={() => setIsLogin(!isLogin)}
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
