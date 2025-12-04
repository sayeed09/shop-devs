import React, { useEffect, useState } from "react";
import { CollectionByHandleResponse, SubCollection } from "../../models/home";
import { homeService } from "../../services/home";
import { productCardBreakPoints } from "../../utils/data-provider";
import { ResponsiveImage } from '../productCard/responsive-image';

interface IProps {
    collectionItem: SubCollection;
    isActive: boolean;
    handleOnClickCategory: (handle: string) => void;
}
const CategorySectionItem = (props: IProps) => {
    const { collectionItem, isActive, handleOnClickCategory } = props;
    return <>
        <div className={`all_categories_title ${isActive ? 'open' : ''}`} onClick={() => handleOnClickCategory(collectionItem.handle)}>
            <div className="wrap">
                <div className="icon_img">
                <ResponsiveImage imageURL={collectionItem.image} widthHeightObject={productCardBreakPoints} altText={`OZiva ${collectionItem.title}`}/>
                </div>
                <div className="title">{collectionItem.title}</div>
            </div>
        </div>
    </>
}
export default CategorySectionItem;