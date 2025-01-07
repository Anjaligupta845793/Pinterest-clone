import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userData } from "./context/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FullLoader from "./component/FullLoader";
import PinDetails from "./component/PinDetails";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
const App = () => {
  const { Loading, isAuth } = userData(); // Destructure `Loading` from context

  return (
    <>
      {Loading ? (
        <FullLoader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/Create" element={isAuth ? <Create /> : <Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={isAuth ? <Profile /> : <Login />} />

            <Route
              path="/Pin/:id"
              element={isAuth ? <PinDetails /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
