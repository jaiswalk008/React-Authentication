import { Link } from 'react-router-dom';
import LoginContext from '../Store/loginContext';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const loginCtx = useContext(LoginContext);
  console.log(loginCtx);
  const logoutHandler = () =>{
    localStorage.removeItem('token');
    loginCtx.setLogin();

  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          <li>
           {loginCtx.loggedIn &&  <Link to='/profile'>Profile</Link>}
          </li>
          <li>
          {loginCtx.loggedIn &&  <button onClick={logoutHandler}>Logout</button>}
            
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
