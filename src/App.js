import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import PostDetales from "./pages/PostDetales";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: localStorage.getItem("user") ? <Navigate to="/" /> : <Signup />,
  },
  {
    path: "/signin",
    element: localStorage.getItem("user") ? <Navigate to="/" /> : <Signin />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-post",
    element: localStorage.getItem("user") ? (
      <AddPost />
    ) : (
      <Navigate to="/signin" />
    ),
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/post/:id",
    element: <PostDetales />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
