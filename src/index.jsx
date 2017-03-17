import React from "react";
import ReactDom from "react-dom";
import {Route, Router, hashHistory} from "react-router";

import "weui";
import "react-weui/lib/react-weui.min.css";

import HomePage from "./wxcomp/page/HomePage.jsx";
import DetailPage from "./wxcomp/page/DetailPage.jsx";

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/detail/:id" component={DetailPage} />
    </Router>
    , document.getElementById("app"));
