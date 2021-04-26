import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import { useSelector } from "react-redux";

const Navbar = () => {
    // const isLoggedIn = true;
    const firebase = useSelector((state) => state?.firebase);
    const auth = useSelector((state) => state?.firebase?.auth);
    const uid = auth?.uid;
    console.log({firebase})

    return (
        <nav className="nav-wrapper">
            <div className="container">
                <Link to='/' className={"brand-logo"}>Configuration-manager</Link>
                { auth.isLoaded &&
                    (uid ?  <LoggedInLinks/> : <LoggedOutLinks/>)
                }
            </div>
        </nav>
    )
}

export default Navbar;