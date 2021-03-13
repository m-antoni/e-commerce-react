import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor }  from './store';
import { authVerify } from './redux/actions/auth.action';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import $ from 'jquery';

// Public Route
import Home from './components/public/Home';
import Login from './components/public/Login';
import Register from './components/public/Register';
import PageNotFound from './components/public/PageNotFound';

// Private Route
import Navbar from './components/layouts/Navbar';
import ProductView from './components/private/ProductView';
import CartItems from './components/private/CartItems';
import CashOnDelivery from './components/private/CashOnDelivery';
import Checkout from './components/private/Checkout';
import PaymentSuccess from './components/private/PaymentSuccess';
import Purchase from './components/private/Purchase';


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
                <PrivateRoute path="/home/purchases" exact component={Purchase}/>
                <PrivateRoute path="/home/products/:id" exact component={ProductView}/>
                <PrivateRoute path="/home/cart" exact component={CartItems}/>
                <PrivateRoute path="/home/checkout" exact component={Checkout}/>
                <PrivateRoute path="/home/checkout/cash-on-delivery" exact component={CashOnDelivery}/>
                <PrivateRoute path="/home/checkout/payment-sucess" exact component={PaymentSuccess}/>
                
                <PublicRoute component={PageNotFound} />
              </Switch>
            </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
