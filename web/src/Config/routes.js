
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Browse from '../Pages/Browse'
import SignUp from '../Pages/SignUp'
import Story from '../Pages/Story'
import PageNotFound from '../Pages/PageNotFound'

const routes = [
    {
        component: Home,
        path: '/',
        isPrivate: false,
        exact: true
    },
    {
        component: Login,
        path: '/login',
        isPrivate: false,
    },
    {
        component: Browse,
        path:  '/browse',
        isPrivate: true,
    },
    {
        component: SignUp,
        path: '/sign-up',
        isPrivate: false,
    },
    {
        component: Story,    
        path: '/story/:slug',
        isPrivate: true,
    },
    {
        component: PageNotFound,
        path: '/*',
        isPrivate: true,
    }
]

export default routes;