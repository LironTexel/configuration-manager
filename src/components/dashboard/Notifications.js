import React from "react";
import moment from "moment";

const Notifications = ({ notifications }) => {
    return (
        <div className={"section"}>
            { notifications && notifications.map( notification => {
                    return (
                        <div key={ notification.id }>
                            <p>{notification.content} - {notification.user}</p>
                            <div>date - { moment(notification.time.toDate()).fromNow() }</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Notifications;