import "./App.scss";
import React from "react";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import Order from "./Order";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    return (
        <div>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/order" component={Order} />
            </Switch>
        </div>
    );
};

export default App;
