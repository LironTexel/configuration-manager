import React from "react";
// import { NavLink } from "react-router-dom";
import { Button } from '@material-ui/core';

const LoggedOutLinks = () => {

    return (
        <div className="logged-in-links">
            <Button variant="outlined" href="/login">Login</Button>
            <Button variant="outlined" href="/signup">Sign Up</Button>
            {/*<li><NavLink to='/login'><button>Login</button></NavLink></li>*/}
            {/*<li><NavLink to='/signup'><button>Sign Up</button></NavLink></li>*/}
        </div>
    )
}

export default LoggedOutLinks;