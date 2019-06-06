
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../Utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        return (isAuthenticated()
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />)
    }} />
)

export default PrivateRoute;