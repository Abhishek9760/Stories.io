import './App.css';

import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import routes from './Config/routes'
import Navbar from './Components/Navbar'
import { AuthProvider } from './Context'
import AppRoute from './Components/AppRoute'

function App() {

  document.querySelector('#root').classList.add('snap-scroll')

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <Switch>
            {routes.map((route, index) => (
              <AppRoute 
                key={index}
                path={route.path}
                isPrivate={route.isPrivate}
                exact={route.exact === true ? true : false }
                component={route.component}
                />
            ))}

          </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
