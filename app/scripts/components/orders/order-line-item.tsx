import React from 'react'
import { formatPriceWithCurrency } from '../../utils/cart/formatter'

interface IProps {
    innerIndex: number;
    innerItem: any;
}
const OrderLineItem = ({innerIndex, innerItem}: IProps) => {
    return (
        <>
            <div className="placed-order-prod-card" key={innerIndex}>
                <div className="placed-order-prod-card-img">
                    <img
                        src={innerItem.image}
                        width={80}
                        className="prod-img-thumb"
                        alt={innerItem.variantTitle}
                    />
                </div>
                <div className="placed-order-prod-card-dtl subtitle-small">
                    <p className="prod-title">{innerItem.name}</p>
                    <div className="subtitle-small text-off-gray odr-qty">
                        Qty:{innerItem.quantity}
                    </div>
                    <div className="productPriceDetails">
                        <span className="priceMRP">MRP: </span>
                        <span className="actualPrice">
                            {formatPriceWithCurrency(innerItem.price * innerItem.quantity)}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderLineItem