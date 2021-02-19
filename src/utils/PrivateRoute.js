import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authVerify } from '../redux/actions/auth/auth.action';
import { Spinner } from '../components/layouts/Spinner';
import { getToken, getUserCart } from '../helpers/common';

// handle the private routes
function PrivateRoute({ component: Component, isAuthenticated, authVerify, loading, ...rest }) {

  useEffect(() => {
      authVerify();
  },[])

  if(loading == 'verify'){
    return <><Spinner/></>
  }

  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />}
    />
  )
}
 
const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.user_data.isAuthenticated
})

export default connect(mapStateToProps, { authVerify })(PrivateRoute);