import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import DashboardPage from "./components/dashboard/DashboardPage"
import LoginPage from "./components/login/LoginForm";
import SignUpPage from "./components/login/SignUpPage";
import history from './history';


import CustomerPage from "./components/customer/CustomerPage"
import CustomerAddUpdatePage from "./components/customer/CustomerAddUpdatePage"
import CustomerlogPage from "./components/customerlog/CustomerlogPage"
import CustomerlogAddUpdatePage from "./components/customerlog/CustomerlogAddUpdatePage"
import DocumentPage from "./components/document/DocumentPage"
import DocumentAddUpdatePage from "./components/document/DocumentAddUpdatePage"
import DocumentlogPage from "./components/documentlog/DocumentlogPage"
import DocumentlogAddUpdatePage from "./components/documentlog/DocumentlogAddUpdatePage"
import UsersPage from "./components/users/UsersPage"
import UsersAddUpdatePage from "./components/users/UsersAddUpdatePage"


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                <Route path="/" exact component={LoginPage}/>
                <Route path="/signup" exact component={SignUpPage}/>
                <Route path="/dashboard" exact component={DashboardPage}/>
                <Route path="/customer" exact component={CustomerPage}/>
<Route path="/customer/add" exact component={CustomerAddUpdatePage}/>
<Route path="/customer/update/:id" exact component={CustomerAddUpdatePage}/>
<Route path="/customerlog" exact component={CustomerlogPage}/>
<Route path="/customerlog/add" exact component={CustomerlogAddUpdatePage}/>
<Route path="/customerlog/update/:id" exact component={CustomerlogAddUpdatePage}/>
<Route path="/document" exact component={DocumentPage}/>
<Route path="/document/add" exact component={DocumentAddUpdatePage}/>
<Route path="/document/update/:id" exact component={DocumentAddUpdatePage}/>
<Route path="/documentlog" exact component={DocumentlogPage}/>
<Route path="/documentlog/add" exact component={DocumentlogAddUpdatePage}/>
<Route path="/documentlog/update/:id" exact component={DocumentlogAddUpdatePage}/>
<Route path="/users" exact component={UsersPage}/>
<Route path="/users/add" exact component={UsersAddUpdatePage}/>
<Route path="/users/update/:id" exact component={UsersAddUpdatePage}/>

                </Switch>
            </Router>
        )
    }
}
