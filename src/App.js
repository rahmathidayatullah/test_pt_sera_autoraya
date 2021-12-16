import React, { useEffect } from "react";
import "./App.css";
import Button from "./components/atoms/button";
import Input from "./components/atoms/input";
import Example from "./components/example";
import Login from "./pages/login";
import Register from "./pages/register";
import AddEditData from "./pages/home/addEditData";
import Home from "./pages/home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
// import fungsi listen
import { listen } from "./app/Listener";
function App() {
  useEffect(() => {
    listen();
  }, []);
  const routes = [
    {
      path: "/",
      Component: Login,
    },
    {
      path: "/home",
      Component: Home,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/addedit",
      Component: AddEditData,
    },
  ];
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addedit/:id" element={<AddEditData />} />
          <Route path="/addedit/" element={<AddEditData />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
