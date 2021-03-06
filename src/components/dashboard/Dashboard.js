import React from "react";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import {Typography} from "@material-ui/core";

const Dashboard = () => {
    // const accounts = useSelector((state) => state?.firestore?.ordered?.accounts);
    const notifications = useSelector((state) => state?.firestore?.ordered?.notifications);
    const auth = useSelector((state) => state?.firebase?.auth);

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div className="dashboard container">
            <Typography variant={"h6"}>Dashboard notifications</Typography>
            <Notifications notifications={ notifications }/>
        </div>
    )
}

// connect causing an error. known issue with react-redux-firebase
// https://github.com/prescottprue/react-redux-firebase/issues/1059
export default Dashboard;