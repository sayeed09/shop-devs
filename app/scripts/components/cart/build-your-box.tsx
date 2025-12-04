import React from "react";
import { LineItem } from "../../models/cart/get-response";
import { BuildYourBoxDetailProvider, getBYBItemsForCart } from "../../utils/build-you-box/helper";
import BYBItem from "./build-your-box-item";

interface IProps {
    cartItems: LineItem[];
}
const BuildYourBox = ({ cartItems }: IProps) => {
    return <>
        {Object.keys(BuildYourBoxDetailProvider).map((item) => {
            return <BYBItem cartItems={getBYBItemsForCart(cartItems,BuildYourBoxDetailProvider[item].benefitChip)} benefitChip={BuildYourBoxDetailProvider[item].benefitChip} />
        })}
    </>
}
export default BuildYourBox;