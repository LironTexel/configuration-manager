import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import BrandDetails from "./components/Brands/BrandDetails";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CreateBrand from "./components/Brands/CreateBrand";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar/>
                <Switch>
                    <Route exact path='/' component={ Dashboard }/>
                    <Route path='/brands/:id' component={ BrandDetails }/>
                    <Route path='/login' component={ Login }/>
                    <Route path='/signup' component={ SignUp }/>
                    <Route path='/create' component={ CreateBrand }/>
                </Switch>
          </header>
        </div>
      </BrowserRouter>
  );
}

export default App;
