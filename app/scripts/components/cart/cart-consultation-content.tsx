import React from 'react';
import { consultationData } from '../../utils/cart/constants';

const CartConsultationContent = () => {
  return (
        <div className='consultation-container'>
            <div className='uds-560-consultation-banner'>
                <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Consultationbanner.png?v=1736322236" alt="Consultation Popup" width={'100%'}/>
            </div>
            <div className='consultation-body'>
                <div>
                    Here’s what you’re getting for
                    <div className="product-card-badge ml-4">
                    1 Month </div> : 
                </div>
                <div className='consultation-info mt-16'>
                    {
                        consultationData.map(item => {
                            return(
                                <p key={item.id} className='consultation-text'><img src={item.icon} alt={item.text} />{item.text}</p>
                            )
                        })
                    }
                </div>
                
            </div>
            <div className='foter-text'>
                Your plan is added to the cart! Proceed to checkout and boost your journey with OZiva! 🚀
            </div>
        </div>
  )
}

export default CartConsultationContent