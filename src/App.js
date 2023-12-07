import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext, useEffect, useState } from 'react';
import LoginContext from './components/Store/loginContext';

function App() {
  const loginCtx = useContext(LoginContext);
  console.log(loginCtx)
  return (
     
      <Layout>
         {console.log('rendering')}
         {console.log(loginCtx.isLoggedin)}
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          {!loginCtx.isLoggedin && <Route path='/auth'>
            <AuthPage />
          </Route>}

          <Route path='/profile'>
            {loginCtx.isLoggedin && <UserProfile />}
            {!loginCtx.isLoggedin && <Redirect to="/auth"/>}
            
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    
  );
}

export default App;
