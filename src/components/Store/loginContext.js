
import React from "react";
const LoginContext = React.createContext({
    isLoggedin:false,
    setLogin:() =>{},
})
export default LoginContext;