import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Create from "./pages/Create";
import store from "./store";
import { useEffect } from "react";
import { lodeUser } from "./actions/userAction";

function App() {
  useEffect(() => {
    store.dispatch(lodeUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}

export default App;
