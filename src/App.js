import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import EditAccount from "./components/accounts/EditAccount";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CreateAccount from "./components/accounts/CreateAccount";
import {firestoreConnect} from "react-redux-firebase";
import Notifications from 'react-notification-system-redux';
import {useSelector} from "react-redux";
import {notificationsStyle} from "./styles/theme";

function App() {
    const notifications = useSelector((state) => {
        return state.notifications;
    });

  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Layout>
                <Switch>
                    <Route exact path='/' component={ Dashboard }/>
                    <Route path='/accounts/:id' component={ EditAccount }/>
                    <Route path='/login' component={ Login }/>
                    <Route path='/signup' component={ SignUp }/>
                    <Route path='/create' component={ CreateAccount }/>
                </Switch>
                <Notifications notifications={notifications} style={notificationsStyle} />
            </Layout>
          </header>
        </div>
      </BrowserRouter>
  );
}

export default firestoreConnect([
    { collection: 'accounts', orderBy: ['name', 'asc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
])(App);
