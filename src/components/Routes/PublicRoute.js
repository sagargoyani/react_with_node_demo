
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../Utils/auth';

const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
        isAuthenticated() === false
            ? <Component {...props} />
            : props && props.location && props.location.pathname && props.location.pathname === '/404'
            ? <component {...props} />
            : <Redirect to={{
                pathname: '/dashboard',
                state: { from: props.location }
            }} />
        )
    }} />
)

export default PublicRoute;