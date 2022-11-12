import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Create from "./pages/Create";
import store from "./store";
import { useEffect } from "react";
import { lodeUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserBlogs from "./pages/UserBlogs";
import Profile from "./pages/Profile";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(lodeUser());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <SignIn />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blog" element={<UserBlogs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
