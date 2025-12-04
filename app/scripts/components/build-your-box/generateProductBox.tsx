import React from "react";
import { IBYBItem } from "../../interface/build-your-box";
import { BYBRemoveItem } from "../../../icons/byb-remove";
import { BuildYourBoxDetailProvider } from "../../utils/build-you-box/helper";

interface IProps {
    selectedVariants: IBYBItem[];
    handleRemoveProduct: (index: number) => void;
    BYBCollectionData: IBYBItem[];
    collectionHandle: string;
}

const GenerateProductBox = ({ selectedVariants, handleRemoveProduct, collectionHandle }: IProps) => {
    if (!collectionHandle) { return null
     }
    return (
        <>
            {
                selectedVariants.length > 0 && selectedVariants.map((items: IBYBItem, index: number) => {
                    return (
                        <>
                            <div className="byb-sticky-item active" key={index}>
                                <div className="byb-sticky-item-box">
                                    <img src={items?.image} alt="Product Name" className="w-100" />
                                    <a href="javascript:void(0)"
                                        onClick={() => handleRemoveProduct(index)}
                                        className="byb-sticky-item-clear">
                                        <BYBRemoveItem />
                                    </a>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            {
                new Array((BuildYourBoxDetailProvider[collectionHandle as string]?.quantity) - selectedVariants.length).fill(null).map((i, index) => {
                    return (
                        <>
                            <div className="byb-sticky-item" key={index}>
                                <div className="byb-sticky-item-box">Product {index + selectedVariants.length + 1} </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
};

export default GenerateProductBox;