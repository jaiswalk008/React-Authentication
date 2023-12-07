import { useRef } from 'react';
import classes from './ProfileForm.module.css';
import axios from 'axios';
const ProfileForm = () => {
  const passwordRef = useRef('');
  const submitHandler = async (e) =>{
    e.preventDefault();
    // console.log(localStorage.getItem('token'))
    const body ={
      idToken:''+localStorage.getItem('token'),
      password:passwordRef.current.value,
      returnSecureToken:true,
    }
    console.log(body)
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key='+process.env.REACT_APP_API_KEY,
    body);
      console.log(res);
      localStorage.setItem('token',res.data.idToken);
      alert('Password changed')
    } catch (error) {
      console.log(error.response.data.error.message)
    }

  }
  
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={passwordRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      
    </form>
  );
}

export default ProfileForm;
