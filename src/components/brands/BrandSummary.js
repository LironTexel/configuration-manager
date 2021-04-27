import React from "react";
import moment from 'moment';

const BrandSummary = ({ brand }) => {
    return (
        <div className="card">
            <div className="card-content">
                <p className={"card-title"}>brand name: { brand.name }</p>
                <p>brand content: { brand.content }</p>
                <p>date { moment(brand.createdAt).calendar() }</p>
                <p>created by { brand.createdBy }</p>
            </div>
        </div>
    )
}
export default BrandSummary;