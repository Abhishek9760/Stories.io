import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AppRoutes = ({
    component: Component,
    path,
    isPrivate,
    ...rest
}) => {

    let isLoggedIn = localStorage.getItem('isLoggedIn')

    return (
        <Route
            path={path}
            render={props =>
                isPrivate && !isLoggedIn ? (
                    <Redirect
                        to={{ pathname: "/login" }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}

export default AppRoutes