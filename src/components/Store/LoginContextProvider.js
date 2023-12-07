import { useState } from 'react';
import LoginContext from './loginContext';
const LoginContextProvider = (props) =>{
    const [loggedIn , setLoggedIn] = useState(false);
    const logInHandler =() => setLoggedIn(!loggedIn);
    const loginContext = {
        loggedIn:loggedIn,
        setLogin:logInHandler
    }

    return <LoginContext.Provider value={loginContext}>{props.children}</LoginContext.Provider>
    
}
export default LoginContextProvider;