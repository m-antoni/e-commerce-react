import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../components/layouts/Spinner';
 
// handle the public routes
function PublicRoute({ component: Component, isAuthenticated, loading, ...rest }) {

  // if(loading === 'verify'){
  //   return null;
  // }

  return (
    <Route {...rest} render={(props) => !isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/home' }} />} />
  )
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.user_data.isAuthenticated
})
 
export default connect(mapStateToProps, {})(PublicRoute);