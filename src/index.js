import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Waiter from './pages/Waiter';
import Kitchen from './pages/Kitchen';
import Historic from './pages/Historic';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { isAuthenticated } from "./route-auth";

const PrivateRoute = ({component: Component, ...rest})=>(
  <Route 
    {...rest} 
    render ={props =>(
      isAuthenticated()? (
        <Component{...props}/>
      ) : (
        <Redirect to ={{pathname: '/login', state:{ from: props.location}}} />
      )
      )      
    }
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Login} exact />
      <Route path='/SignUp' component={SignUp} exact /> 
       <PrivateRoute path ='/waiter' component={Waiter} exact /> 
       <PrivateRoute path ='/kitchen' component={Kitchen} exact /> 
       <PrivateRoute path ='/Historic' component={Historic} /> 
      <Route component={() => <div>Page 404</div>}/>
    </Switch>
  </BrowserRouter>,

  document.getElementById('root')
);

reportWebVitals();
