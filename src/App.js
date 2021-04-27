import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Navbar from "./components/layout/navbar/Navbar";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import EditBrand from "./components/brands/EditBrand";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CreateBrand from "./components/brands/CreateBrand";

function App() {

  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            {/*<Navbar/>*/}
            <Layout>
                <Switch>
                    <Route exact path='/' component={ Dashboard }/>
                    <Route path='/brands/:id' component={ EditBrand }/>
                    <Route path='/login' component={ Login }/>
                    <Route path='/signup' component={ SignUp }/>
                    <Route path='/create' component={ CreateBrand }/>
                </Switch>
            </Layout>
          </header>
        </div>
      </BrowserRouter>
  );
}

export default App;
