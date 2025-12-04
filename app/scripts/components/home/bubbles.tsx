import React from "react";
import { ResponsiveImage } from "../productCard/responsive-image";
import { bubbleImageBreakPoints } from "../../utils/data-provider";

export const Bubbles = ({ collection, selectedCollection, setSelectedCollection }) => {
    return (
        <div id={collection.handle} key={collection.handle} className={collection.handle === selectedCollection ? 'active-bubble' : 'bubbles'} onClick={() => {setSelectedCollection(collection?.handle)}}>
            <ResponsiveImage imageURL={collection.imgSrc} widthHeightObject={bubbleImageBreakPoints} altText={collection.name} />
            <p className='bubble-name'>{collection.name}</p>
        </div>
    );
}