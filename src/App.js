import Home from "./pages/Home/Home";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { FETCH_ACCOUNT_API, USER_LOGIN } from "./redux/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/join/login" />
          <Route component={SignUp} exact path="/join/sign-up" />
          <Route component={Home} exact path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
