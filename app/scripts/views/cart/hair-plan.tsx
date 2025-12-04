import React, { useContext, useEffect, useState } from "react";
import { LineItem as LineItemModel } from "../../models/cart/get-response";
import LineItem from "../../components/cart/line-item";
import { DeleteIcon } from "../../../icons/delete-icon";
import { formatCartRadiumAPIVariant, formatPriceWithCurrency } from "../../utils/cart/formatter";
import { cartService } from "../../services/cart";
import { CartContext } from "../../context/cart";
import useCartDetails from "../../hooks/cart";
import { removeFromLocalStorage } from "../../utils/helper";
import { HAIR_QUIZ_PRODUCTS_KEY } from "../../utils/quiz/provider";
import { OneMonthConsultMRP } from "../../utils/data-provider";
import { hostDomain } from "../../utils/endpoints";

interface Props {
    cartItems: LineItemModel[]
}

const HairPlan = ({ cartItems }: Props) => {
    const [isLoading, setLoading] = useState(false);
    const { state } = useContext(CartContext);
    const { getCart, getHairPlanItems, removeCoupon } = useCartDetails();

    useEffect(() => {
        if (getHairPlanItems().length > 0) {
            removeCoupon();
        }
    }, []);
    const deleteItems = () => {
        setLoading(true);
        let productIdsObject = {}
        cartItems.forEach((item) => productIdsObject[item.variant_id] = 0)

        const updateProduct: any = {
            updates: productIdsObject,
        };
        cartService.updateItems(updateProduct).then((data) => {
            removeFromLocalStorage(HAIR_QUIZ_PRODUCTS_KEY);
            const requestPayload = formatCartRadiumAPIVariant(
                data,
                state.discountCode,
                state.cashApplied,
            );

            getCart(requestPayload)
                .then(() => {
                    setLoading(false);
                    return data;
                })
                .catch(() => {
                    setLoading(false);
                });
        });

    }
    const hairItems = getHairPlanItems();
    const totalMrp = hairItems.reduce((sum, { compare_at_price }) => sum + compare_at_price, 0);
    const price = hairItems.reduce((sum, { price }) => sum + price, 0)

    return <>
        <div className="product-card-box-v2 prime-product-card" style={isLoading ? { opacity: 0.6 } : {}}
        >
            <div className="product-card-box-v2-items">
                <div className="product-card-box-v2-dtl w-100">
                    <a
                        href="javascript:void(0)"
                        onClick={() => { deleteItems() }}
                        className="cartItemDelete"
                    >
                        <DeleteIcon />
                    </a>
                    <a href="#">
                        <h2 className="productCartTitle">{'Customized Hair Growth Plan'}</h2>
                    </a>
                    <div className="productPriceDetails">
                        <span className="priceMRP">MRP:</span>
                        {totalMrp - price > 0 &&
                            <del className="priceMRP">{formatPriceWithCurrency(
                                totalMrp / 100)
                            }</del>}
                        <span className="actualPrice">
                            {formatPriceWithCurrency(
                                price / 100)
                            }
                        </span>
                    </div>
                    {totalMrp - price > 0 &&
                        <div className="productPriceDetails pt-8">
                            <span className="totalPriceOff">
                                <span className="mr-4">You save:</span>
                                {formatPriceWithCurrency(
                                    (totalMrp - price) / 100,
                                )}
                            </span>
                        </div>}
                </div>
            </div>
            <div className="product-card-box-v2 prime-free-bee-section quiz-cart-lists">
                {cartItems.map((item) => (
                    <LineItem image={item.image} title={item.title} price={item.price} compareAtPrice={item.compare_at_price} />
                ))}
                {
                    hostDomain != 'oziva.com' &&
                    <LineItem
                        image={'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796'}
                        title={'1 Month Nutritionist Diet Consultation + Diet Plan'}
                        price={0}
                        compareAtPrice={OneMonthConsultMRP}
                        hideYouSave
                        badgeTitle="1 Month"
                    />
                }
            </div>
        </div>
    </>


}
export default HairPlan;