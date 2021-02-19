import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from 'reactstrap';

import { getAuthUser } from './Redux/actions/authActions';

import AppNavbar from './components/AppNavBar';
import Home from './components/pages/Home/Home';
import PrivateRoute from './components/routes/PrivateRoute';
import Dashboard from './components/pages/Dashboard/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);
  const getUser = () => dispatch(getAuthUser());

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;