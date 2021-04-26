import React from "react";
// import {Link} from "react-router-dom";
// import BrandSummary from "../Brands/BrandSummary";
import moment from "moment";

const Notifications = ({ notifications }) => {
    return (
        <div className={"section"}>
            { notifications && notifications.map( notification => {
                    return (
                        <div>
                            <p key={ notification.id }>{notification.content} - {notification.user}</p>
                            <div>date - { moment(notification.time.toDate()).fromNow() }</div>
                        </div>
                    )
                })
            }
            {/*<div className="card">*/}
            {/*    <ul className="notifications">*/}
            {/*        <li>notification</li>*/}
            {/*        <li>notification</li>*/}
            {/*        <li>notification</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )
}

export default Notifications;