
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Browse from '../Pages/Browse'
import SignUp from '../Pages/SignUp'
import Story from '../Pages/Story'
import PageNotFound from '../Pages/PageNotFound'
import EditStory from '../Pages/EditStory'
import YourStories from '../Pages/YourStories'
import About from '../Pages/About'
import Easter from '../Pages/Easter'

const routes = [
    {
        component: Home,
        path: '/',
        isPrivate: false,
        exact: true
    },
    {
        component: About,
        path: '/about',
        isPrivate: false
    },
    {
        component: Login,
        path: '/login',
        isPrivate: false,
    },
    {
        component: Browse,
        path:  '/browse',
        isPrivate: false,
    },
    {
        component: YourStories,
        path: '/your-stories',
        isPrivate: true
    },
    {
        component: SignUp,
        path: '/sign-up',
        isPrivate: false,
    },
    {
        component: Story,
        exact: true,    
        path: '/story/:slug',
        isPrivate: false,
    },
    {
        component: EditStory,
        path: '/story/edit/:slug',
        isPrivate: true,
    },
    {
        component: Easter,
        path: '/easter/at_stories_io',
        isPrivate: true
    },  
    {
        component: PageNotFound,
        path: '/*',
        isPrivate: true,
    }
]

export default routes;