import React,{useState,useEffect} from 'react';
import {  Route, Switch, Redirect} from "react-router-dom";
import {useLocation} from 'react-router-dom'
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import {GlobalProvider} from './context/GlobalContext'


export default function App() {
    const usertoken = localStorage.getItem('usertoken');
    const location = useLocation();
    const [token, setToken] = useState(usertoken);
    useEffect(() => {
        setToken(usertoken)
    },[location.pathname]);

    return (
      <GlobalProvider>
        <Switch>
          {token !== null ? 
          <>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/auth" to="/admin/index" /></>
          :          
            <>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/admin" to="/auth/login" />
          </>
            }
        </Switch>
      </GlobalProvider>
    )
}

