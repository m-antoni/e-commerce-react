import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor }  from './store';
import $ from 'jquery';

// Routes
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

// Public Route
import Home from './components/public/Home';
import Login from './components/public/Login';
import Register from './components/public/Register';
import PageNotFound from './components/public/PageNotFound';

// Private Route
import Dashboard from './components/private/Dashboard';
import Navbar from './components/layouts/Navbar';


function App() {

  useEffect(() => {
    $('body').addClass('bg-black');
   }, [])

  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
            <Fragment>
              <Navbar/>
              <Switch>
                <PublicRoute path="/" exact component={Home}/>
                <PublicRoute path="/login" exact component={Login}/>
                <PublicRoute path="/register" exact component={Register}/>

                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                
                <PublicRoute component={PageNotFound} />
              </Switch>
            </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
