import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor }  from './store';
import { authVerify } from './redux/actions/auth/auth.action';
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
import Navbar from './components/layouts/Navbar';
import ProductView from './components/private/ProductView';
import CartItems from './components/private/CartItems';


function App() {

  useEffect(() => {
    store.dispatch(authVerify()); // verify the token 
    $('body').addClass('bg-gray-100');
  },[])

  
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

                <PrivateRoute path="/home" exact component={Home}/>
                <PrivateRoute path="/home/products/:id" exact component={ProductView}/>
                <PrivateRoute path="/home/user/cart" exact component={CartItems}/>
                <PublicRoute component={PageNotFound} />
              </Switch>
            </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
