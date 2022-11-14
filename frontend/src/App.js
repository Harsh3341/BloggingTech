import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Create from "./pages/Create";
import store from "./store";
import { useEffect } from "react";
import { lodeUser } from "./actions/userAction";
import UserBlogs from "./pages/UserBlogs";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(lodeUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <SignIn />}
        />
        <Route
          path="/create"
          element={isAuthenticated ? <Create /> : <SignIn />}
        />
        <Route
          path="/blog"
          element={isAuthenticated ? <UserBlogs /> : <SignIn />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <SignIn />}
        />
        <Route
          path="/password/update"
          element={isAuthenticated ? <ResetPassword /> : <SignIn />}
        />
      </Routes>
    </>
  );
}

export default App;
