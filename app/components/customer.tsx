import React, { useEffect, useState } from "react";
import CustomerReviews from "./customer-reviews.client";

const Customer = ({ producId, title }) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(true)
    }, [])
    return <>
        {state ? <CustomerReviews productId={producId} title={title} /> : null}

    </>
}
export default Customer;