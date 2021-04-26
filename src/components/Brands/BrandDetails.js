import React from "react";
import { useSelector } from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Redirect} from "react-router-dom";
import moment from "moment";

const BrandDetails = (props) => {
    const id = props?.match?.params?.id;
    const brands = useSelector((state) => state?.firestore?.data?.brands);
    const brand = brands?.[id];
    const auth = useSelector((state) => state?.firebase?.auth);

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div className="container section brand-details">
            {
                !brand && <div>loading brand</div>
            }
            { brand &&
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Brand title {brand.name}</span>
                        <p>{brand.content}</p>
                    </div>
                    <div className="card-action">
                        <div>date - { moment(brand.createdAt).calendar() }</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default firestoreConnect([{ collection: 'brands' }])(BrandDetails);