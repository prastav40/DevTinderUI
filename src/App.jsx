import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import Feed from "./components/Feed"
import Footer from "./components/Footer"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "../utils/appstore"
import Body from "./components/Body"
import ProfileEdit from "./components/ProfileEdit"
import Connection from "./components/Connection"
import ConnectionRequest from "./components/connectionrequest"
import Signup from "./components/SignUp"

function App() {
  return (
    <>
      <Provider store={appStore}>
        {/* Added min-h-screen and flex */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          {/* Use flex-grow here to push the footer to the bottom */}
          <div className="flex-grow">
            <Outlet />
          </div>

          <Footer />
        </div>
      </Provider>
    </>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<Body />
      },
      {
        path: "/Feed",
        element: <Feed />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path:"/ProfileEdit",
        element:<ProfileEdit />
      },
      {
        path:"/Connections",
        element:<Connection />
      },
      {
        path:"/ConnectionRequest",
        element:<ConnectionRequest />
      },
      {
        path:"/Signup",
        element:<Signup />
      }
    ]

  }
])
export default router
