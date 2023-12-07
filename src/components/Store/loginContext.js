
import React from "react";
const LoginContext = React.createContext({
    isLoggedin:false,
    login:(token) =>{},
    token:'',
    logout : () =>{},
})
export default LoginContext;