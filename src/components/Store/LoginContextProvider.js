import { useState } from 'react';
import LoginContext from './loginContext';
const LoginContextProvider = (props) =>{

    const initialToken = localStorage.getItem('token');
    const [token , setToken] = useState(initialToken);

    const userLoggedIn = !!token;
    const logInHandler= (token) =>{
        setToken(token);
        localStorage.setItem('token',token);
    }
    const logoutHandler = () =>{
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginContext = {
        isLoggedin:userLoggedIn,
        login:logInHandler,
        token:token,
        logout:logoutHandler,
    };

    return <LoginContext.Provider value={loginContext}>{props.children}</LoginContext.Provider>
    
}
export default LoginContextProvider;