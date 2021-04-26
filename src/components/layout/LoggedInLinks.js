import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/actions/authActions";
import {useDispatch, useSelector} from "react-redux";

const LoggedInLinks = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state?.firebase?.profile);


    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="logged-in-links">
            <p>hello {profile.username}!</p>
            <ul>
                <li><NavLink to='/create'><button>New Brand</button></NavLink></li>
                <li><button onClick={ logout }>Logout</button></li>
                <li><NavLink to='/'><button>user details</button></NavLink></li>
            </ul>
        </div>
    )
}

export default LoggedInLinks;