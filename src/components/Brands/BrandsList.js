import React from "react";
import { Link } from "react-router-dom";
import BrandSummary from "./BrandSummary";

const BrandsList = ({ brands }) => {
    return (
        <div className="brands-list section">
            {
                brands && brands.map( brand => {
                    return (
                        <Link to={'/brands/' + brand.id} key={ brand.id }>
                            <BrandSummary brand={ brand }/>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default BrandsList;