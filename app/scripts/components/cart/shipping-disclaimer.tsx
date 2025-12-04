import React from  'react';
import { FireIcon } from '../../../icons/fire-icon';

const ShippingDisclaimer = (props) => {
    const {discount} = props;
    return(
        <div className='shipping-disclaimer'>
            <div className='icon-holder'>
            <FireIcon/>
            <h4 style={{marginLeft: '4px', display: 'inline-block', color: '#FF6F00', verticalAlign: 'top'}}>
                DUE TO HIGH DEMAND
            </h4>
            </div>
            <h4 className='shipping-notice'>
            Next order ships in 3-4 days!
            </h4>
            <div className='shipping-features'>
            <ul style={{marginLeft: '16px'}}>
                <li>
                Reserve Yours Before We Sell Out
                </li>
                {discount > 0 ?
                    <li style={{marginBottom: 0}}>
                        <span>
                            Save Big: At Least 33% OFF!
                        </span>
                        {/* <span>{Math.round(discount)}% Off All 1 Month Supply Reservation</span> */}
                    </li>
                : null}
            </ul>
            </div>
        </div>
    );
}

export default ShippingDisclaimer;