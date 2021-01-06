import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAuthState } from '../../Context'

const AppRoutes = ({
    component: Component,
    path,
    isPrivate,
    ...rest
}) => {
    const userDetails = useAuthState()
    console.log(isPrivate)
    console.log(userDetails.userDetails)
    console.log((isPrivate && userDetails.userDetails === ""))
    return (
        <Route
            path={path}
            render={props =>
                isPrivate && userDetails.userDetails === "" ? (
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