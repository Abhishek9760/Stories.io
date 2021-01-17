import './App.css';

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import routes from './Config/routes'
import Navbar from './Components/Navbar'
import AppRoute from './Components/AppRoute'
import AddStory from './Pages/AddStory';

function App() {

  const [isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem('isLoggedIn'));
  const [user, setUser] = useState({ username: '  ' })

  
  useEffect(() => {

    if (localStorage.getItem('currentTheme') === null) {
      document.querySelector('body').classList.add('light') 
      localStorage.setItem('currentTheme', 'light')
    }
    else document.querySelector('body').classList.add(
      localStorage.getItem('currentTheme')
    )

    document.querySelector('#root').classList.add('snap-scroll')
    try {
      setIsLoggedIn(localStorage.getItem('isLoggedIn'))
      setUser(JSON.parse(localStorage.getItem('currentUser')))
    } catch (err) {
      setIsLoggedIn(false)
      setUser({})
    }
  }, [])

  return (
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
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
        {isLoggedIn &&
         <AddStory userName={user.username} />
         }
      </BrowserRouter>
  );
}

export default App;
