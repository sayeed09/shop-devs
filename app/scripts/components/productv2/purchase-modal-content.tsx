import React, { useEffect } from "react";
import { ProductImageModal, SubscriptionPlan } from "../../interface/product";
import { formatPriceWithCurrency } from "../../utils/cart/formatter";
import { StarFilled } from "../../../icons/star-filled";
import { isMobile } from "../../utils/helper";
import { SUBSCRIPTION_PREPAID_PRODUCTS } from "../../utils/product/constants";

interface IProps {
    buyNow: () => void;
    planArray: SubscriptionPlan[];
    activeSubscribeData: SubscriptionPlan | undefined;
    onPlanChange: (plan: any) => void;
    averageRating: string;
    productImage: ProductImageModal;
    productId: string;
}

const Footer = ({ price, compareAtPrice, buyNow, averageRating, productImage }: { price: number, compareAtPrice: number, buyNow: () => void, averageRating: string, productImage: ProductImageModal }) => (<div className="footer-cta-container">
    <div className="img-ratings-container">
        <img className="thumbhnail-img" src={productImage?.src} />
        <div className="rating-container">
            <span>{averageRating}</span>
            <StarFilled />
        </div>
    </div>
    <button className="cta-btn" onClick={buyNow}>
        {isMobile() &&
            <div className="pricing-container">
                <span className="mrp">MRP: {compareAtPrice - price > 0 && <span className="strike">
                    {formatPriceWithCurrency(compareAtPrice)}
                </span>}
                </span>
                <span className="selling-price">{formatPriceWithCurrency(price)}</span>
                <span className="horizontal-line"></span>
                {compareAtPrice - price > 0 && <span className="save-text">Save {formatPriceWithCurrency(compareAtPrice - price)}</span>}
            </div>
        }
        <div className="buy-now-txt">
            BUY NOW
            {!isMobile() && <span className="selling-price"> - {formatPriceWithCurrency(price)}</span>}
        </div>
    </button>
</div>);

const ValuePropsitions = () => (<div className="value-propostions">
    <div className="item-propostion">
        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/delivery-truck.svg?v=1734594462" />
        <div>Free fast shipping</div>
    </div>
    <div className="item-propostion">
        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/back-in-time_1.svg?v=1734594462" />
        <div>Delivered every month</div>
    </div>
    <div className="item-propostion">
        <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/stop.svg?v=1734594462" />
        <div>Pause or cancel anytime</div>
    </div>
</div>)

const PurchaseModalContent = ({ buyNow, activeSubscribeData, onPlanChange, planArray,
    averageRating, productImage, productId }: IProps) => {
    // const isPrepaidOnlySubscription = SUBSCRIPTION_PREPAID_PRODUCTS.indexOf(+productId) > -1 ? true : false;
    const isPrepaidOnlySubscription = false;

    useEffect(() => {
        if (planArray && planArray.length > 0) {
            const threeMonthPlan = planArray.find((item) => item?.subscription_interval == 3);
            const oneMonthPlan = planArray.find((item) => item?.subscription_interval == 1);
            if (threeMonthPlan && !isPrepaidOnlySubscription) {
                onPlanChange(threeMonthPlan);
            }
            else if (isPrepaidOnlySubscription) {
                onPlanChange(oneMonthPlan);
            }
        }
    }, [planArray])
    return <>
        <div className="modal-content center purchase-options">
            <h3 className="modal-head mb-0">Purchase Options</h3>
            <div className="modal-content-inner">
                <div className="plans-container">
                    {activeSubscribeData?.subscription_interval != 1 && isPrepaidOnlySubscription &&
                        <div className="prepaid-messaging-container">
                            <div className="prepaid-messaging">
                                <img width={22} height={22} src="https://cdn.shopify.com/s/files/1/2393/2199/files/gif-upi_ee2e0ba5-ca98-4c44-bb5c-c54358686eb8.gif?v=1743153926" />
                                <span className="text">Only <span className="bold">online payments </span>accepted for 3 and 6 month plan</span>
                            </div>
                        </div>
                    }
                    <div className="subtext">Select Duration</div>

                    <div className="plans-list">
                        {planArray.map((item, index) => (<div key={item.plan_id + "AB1"} className={`plan-item 
                            ${activeSubscribeData?.plan_id === item.plan_id ? 'active' : ''}`} onClick={() => onPlanChange(item)}>
                            {item?.subscription_interval == 3 && <span className="recommended">Recommended</span>}

                            <div className="plan-header">
                                <div className="plan-text">{item?.subscription_interval == 1 ? 'One' : item?.subscription_interval == 3 ? 'Three' : 'Six'}</div>
                                <div className="sub-text">{item?.subscription_interval == 1 ? "Time Purchase" : 'Months'}</div>
                            </div>
                            <div className="pricing-container">
                                <div className="selling-price">{formatPriceWithCurrency(item.base_price)}
                                    {item?.subscription_interval != 1 &&
                                        <span className="per-month">/month</span>}
                                </div>
                                {item.compare_at_price - item.base_price > 0 && <div className="mrp">{formatPriceWithCurrency(item.compare_at_price)}</div>}
                            </div>
                            {item?.subscription_interval != 1 && <span className="save-txt">Save: {formatPriceWithCurrency(item.compare_at_price - item.base_price)}</span>}

                        </div>))}

                    </div>
                </div>
                {activeSubscribeData?.subscription_interval != 1 &&
                    <ValuePropsitions />
                }
                <Footer
                    compareAtPrice={activeSubscribeData?.compare_at_price as number}
                    price={activeSubscribeData?.base_price as number}
                    buyNow={buyNow}
                    averageRating={averageRating}
                    productImage={productImage}
                />
            </div>
        </div>
    </>
}
export default PurchaseModalContent;