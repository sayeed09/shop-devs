import React from 'react';
import { isValidUrl } from '../../utils/product/formatter';
import parse from 'html-react-parser';
import { HighlightElement } from '../../interface/product';

interface IngredientsItemModal {
  item: HighlightElement;
}

const IngredientsItem = (props: IngredientsItemModal) => {
  const item = props;
  return (
    <>
      <div className="lists-of-use">
        <div className="row">
          <div className="col-auto">
            {isValidUrl(item?.item?.image) ? (
              <img
                src={item?.item?.image}
                width="90"
                alt={item?.item?.description}
                className={`${
                  item?.item?.image.indexOf('svg') > -1 ? 'svg' : ''
                }`}
              />
            ) : (
              parse(item?.item?.image)
            )}
          </div>
          <div className="col">
            <p className="subtitle-text font-medium">{item?.item?.title}</p>
            <p className="text-off-gray">{item?.item?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default IngredientsItem;
