import React from 'react';
import { consultationData, consultationReview, nutritionistData } from '../../utils/cart/constants';
import CartConsultationReview from '../productv2/google-reviews/consultation-reviews';

const CartConsultationContentV1 = () => {

    return (
        <>
            <div className='heading-text'>
                <span>Free Expert Consultation</span> for your goals
            </div>

            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Banner_bbfcd8aa-1826-4167-a02e-975d116a417d.png?v=1752044960" alt="Banner" className='banner-image' />

            <div className='nutritionist-container'>
                {
                    nutritionistData.map((item, index) => {
                        return (
                            <div key={index} className='nutritionist-card'>
                                <img src={item.imgage} alt={item.name} className='nutritionist-image' />
                                <div className='nutritionist-name'>{item.name}</div>
                                <div className='nutritionist-info'>{item.information}</div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='consultation-reviews'>
                <div className='consultation-reviews-heading'>Millions of Transformations</div>
                <div className='consultation-reviews-subheading'>You could be the next success story!</div>

                <CartConsultationReview />
            </div>
            <div className='consultation-body'>
                <div>
                    What you’re getting for
                    <div className="product-card-badge ml-4">
                        1 Month </div> :
                </div>
                <div className='consultation-info mt-16'>
                    {
                        consultationData.map(item => {
                            return (
                                <p key={item.id} className='consultation-text'><img src={item.icon} alt={item.text} />{item.text}</p>
                            )
                        })
                    }
                </div>

            </div>

        </>
    )
}

export default CartConsultationContentV1;