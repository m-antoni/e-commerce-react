import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// handle the private routes
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />}
    />
  )
}
 
const mapStateToProps = state => ({
    isAuthenticated: state.auth.user_data.isAuthenticated
})

export default connect(mapStateToProps, {})(PrivateRoute);