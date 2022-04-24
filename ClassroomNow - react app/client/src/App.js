import React from 'react';
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Entry from "./pages/groupChat/entry";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Calendar from './pages/routine/calender';


function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Switch>

      <Route exact path="/">
        <Profile />
      </Route>

      <Route exact path="/notice">
        <Home />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/login">
        {user?<Profile />:<Login />}
      </Route>

      <Route exact path="/Write">
        {user &&(user.role==="CR"|| user.role==="Faculty")?<Write />:<Register />}
      </Route>

      <Route exact path="/settings">
        {user?<Settings />:<Register /> }
      </Route>

      <Route exact path="/post/:postId">
        {<Single /> }
      </Route>

      <Route exact path="/chat">
        <Entry />
      </Route>

      <Route exact path="/routine">
        <Calendar />
      </Route>

      </Switch>
    </Router>

  );
}

export default App;
