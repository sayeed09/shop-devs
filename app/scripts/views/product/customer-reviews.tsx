import React, { useEffect, useState } from 'react';
import { productService } from '../../services/product';
import parse from 'html-react-parser';
import { CustomerModal } from '../../interface/product';

interface CustomerReviewsModal {
  productId: string;
}

const CustomerReviews = (props: CustomerReviewsModal) => {
  const [customerReview, setCustomerReview] = useState<any>('');
  useEffect(() => {
    getAllReviews();
  }, []);
  const getAllReviews = () => {
    productService
      .getStarAllReviewDetails(props.productId)
      .then((data: CustomerModal) => {
        setCustomerReview(data.widget);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  return <>{parse(customerReview)}</>;
};
export default CustomerReviews;
