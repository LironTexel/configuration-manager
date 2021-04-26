import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOutLinks = () => {
    return (
        <div className="logged-in-links">
            <ul>
                <li><NavLink to='/login'><button>Login</button></NavLink></li>
                <li><NavLink to='/signup'><button>Sign Up</button></NavLink></li>
            </ul>
        </div>
    )
}

export default LoggedOutLinks;