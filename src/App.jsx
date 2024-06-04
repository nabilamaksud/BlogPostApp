import Root from './components/root';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import BlogContextProvider from './context/BlogContextProvider';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Profile from './components/Profile'
import UserContextProvider from './context/UserContext';
import Register from './pages/RegisterPage'
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: <Profile />
      }, {
        path: "/register",
        element: <Register />
      }]
    }
  ])


const App = () => {
  return (
    <UserContextProvider>
      <BlogContextProvider>
        <RouterProvider router={router} />
      </BlogContextProvider>
    </UserContextProvider>

  );
};

export default App;