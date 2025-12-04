import React, {useContext} from 'react';
import { DocumentWidthContext } from '../../context/documentWidth';
import { maxMobileWidth } from '../../utils/product/formatter';
import { ScheduledMobileIcon } from '../../../icons/scheduled-delivery-mobile';
import { ScheduledIcon } from '../../../icons/scheduled-delivery';
import { CashOnDeliveryMobile } from '../../../icons/cancel-delivery-mobile';
import { CashOnDelivery } from '../../../icons/cash-delivery';
import { PostponeMobileDesk } from '../../../icons/postpone-desk-mobile';
import { PostponeDesk } from '../../../icons/postpone-desk';

const HowToSubscribe = () => {

    const documentWidth = useContext(DocumentWidthContext);
  return (
    <div className="PurchaseOptions-dtl rounded-border bg-light-gray p-16 mb-8">
        <div
        className="row mb-16 text-center"
        style={{ display: 'flex' }}
        >
        <div className="col hts-icons">
            <ScheduledIcon />
            <div className="f-13 text-gray mt-4">
                Scheduled <br />
                Deliveries
            </div>
        </div>
        <div className="col hts-icons">
            <CashOnDelivery />
            <div className="f-13 text-gray mt-4">
                COD <br />
                Available
            </div>
        </div>
        <div className="col hts-icons">
            <PostponeDesk />
            <div className="f-13 text-gray mt-4">
                Cancel/Postpone <br />
                Anytime
            </div>
        </div>
        </div>
        <div className="PurchaseOptions-list">
        <p className="font-medium mb-8">How to subscribe?</p>
        <ul className="listing-2">
            <li>Select subscription duration (3 months/6 months).</li>
            <li>Click on Buy Now and choose your payment mode (online/cash on delivery).</li>
            <li>You will receive your OZiva product at your doorstep every month as per the chosen subscription duration.</li>
            <li>
            Contact us at{' '}
            <a href="mailTo:community@oziva.in">community@oziva.in</a>{' '}
            to cancel or postpone your subscription.
            </li>
        </ul>
        </div>
    </div>
  );
}

export default HowToSubscribe;