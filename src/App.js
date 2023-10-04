import "./App.scss";
import React from "react";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import Order from "./Order";
import Game from "./Game";
import SideNav from "./SideNav";
import RegisteredUsers from "./RegisteredUsers";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const path = window.location.pathname;

    return (
        <div className="main">
            {(path !== '/dashboard' && path !== '/') ? <SideNav /> : null}
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/order" component={Order} />                
                <Route path="/registered-users" component={RegisteredUsers} />
                <Route path="/game" component={Game} />
            </Switch>
        </div>
    );
};

export default App;
