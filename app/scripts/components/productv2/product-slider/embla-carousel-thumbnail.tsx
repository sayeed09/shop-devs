import React, { useContext } from 'react';
import { convertImageSize, maxMobileWidth } from '../../../utils/product/formatter';
import { ProductImageModal } from '../../../interface/product';
import { DocumentWidthContext } from '../../../context/documentWidth';

type ThumbProps = {
    selected: boolean;
    item: ProductImageModal;
    onClick: () => void;
    productTitle: string;
};

export const Thumbnail: React.FC<ThumbProps> = ({ selected, onClick, item, productTitle }) => {
    const documentWidth = useContext(DocumentWidthContext);

    return (
        <div
            className={`embla-thumbs__slide${selected ? ' embla-thumbs__slide--selected' : ''}`}
            onClick={onClick}
        >
            <img
                height="100%"
                width="100%"
                src={convertImageSize(item.src, documentWidth < maxMobileWidth ? 50 : 100, documentWidth < maxMobileWidth ? 50 : 100)}
                alt={productTitle}
                className={`${selected ? 'selected-img' : 'non-selected-img'}`}
            />
        </div>
    );
};