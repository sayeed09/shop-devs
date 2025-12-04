import React from 'react';
import { resizeImage } from '../../utils/common-functions';

interface IProps {
  imageURL: string;
  widthHeightObject: {
    small: string;
    medium: string;
    large: string;
  };
  altText: string;
  loading?: 'eager' | 'lazy';
  className?: string;
}
export const ResponsiveImage = ({imageURL, widthHeightObject, altText, loading, className}: IProps) => {
    return (
      <picture>
        <source media="(max-width: 430px)" srcSet={resizeImage(imageURL, widthHeightObject.small)}/>
        <source media="(max-width: 720px)" srcSet={resizeImage(imageURL, widthHeightObject.medium)} />
        <source media="(min-width: 721px)" srcSet={resizeImage(imageURL, widthHeightObject.large)} />
        <img src={imageURL} width="100%" alt={altText} loading={loading ? loading : 'eager'} className={className ? className : 'responsive-img'}/>
      </picture>
    )
}
