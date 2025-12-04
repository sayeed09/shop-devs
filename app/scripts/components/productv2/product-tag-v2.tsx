import React from 'react'

interface IProps {
    title: string;
    className: string;
}

const ProductTagV2 = ({ className, title }: IProps) => {
    return (
        <>
            <div className={`product-tag ${className}`}>
                <span>
                    {title}
                </span>
            </div>
        </>
    )
}

export default ProductTagV2;