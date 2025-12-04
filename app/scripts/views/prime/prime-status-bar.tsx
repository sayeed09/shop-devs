import React from 'react';
import { OZPrimeLogo } from '../../../icons/oz-prime-logo';
import { UserProfileResponseModel } from '../../models/cart/user';
import {CurrentPrimeStatus} from '../../models/prime';

interface IPrimeStatusBar {
  status: string;
  details?: UserProfileResponseModel;
}

const PrimeStatusBar = ({ status, details }: IPrimeStatusBar) => {
  return(
    <>
      <div className="free-bee-header pt-0 pb-0">
        <div className="free-bee-header-logo">
          <OZPrimeLogo />
        </div>
        <div className="free-bee-header-dtls">
          {status == CurrentPrimeStatus.PRIME ? 
          <>
            <h2 className="d-flex">
              Savings with OZiva Prime Membership <span className="prime-active-tag">ACTIVE</span>
            </h2>
            <p>
              Member Since{' '}
              {new Date(details?.prime?.updated_at).toLocaleDateString()}
            </p>
          </>
          : (status == CurrentPrimeStatus.FREE_TRAIL_EXPIRED || status == CurrentPrimeStatus.EXPIRED) ?
            <>
              <h2 className="d-flex">
                  Savings with OZiva Prime Membership <span className="prime-active-tag" style={{ color: "#7E7E7E", background: "#E0E0E0" }}>EXPIRED</span>
              </h2>
              <p>
                Your Membership has expired.
              </p>
            </>
          : (status == CurrentPrimeStatus.FREE_TRIAL) ?
            <>
              <h2 className="d-flex">
                    Free Trial <span className="prime-active-tag">ACTIVE</span>
              </h2>
              <p>
                Your free trial is active till{' '}
                {new Date(details?.prime?.expire_at).toLocaleDateString()}
              </p>
            </>
          : <h2 className="d-flex">
              Become a Prime Member
            </h2>
            }
        </div>
        <div className="free-bee-header-price-dtls">
          {status == CurrentPrimeStatus.PRIME ? 
              <>
                <span className="bee-head-price-text">worth</span>{' '}
                <span className="bee-head-price">
                  ₹{Number(details?.wallet?.prime_savings).toLocaleString('en')}
                </span>
              </>
            : (status == CurrentPrimeStatus.FREE_TRAIL_EXPIRED || status == CurrentPrimeStatus.EXPIRED) ?
              <>
                <span className="bee-head-price-text">worth</span>{' '}
                <span className="bee-head-price">
                  ₹{Number(details?.wallet?.prime_savings).toLocaleString('en')}
                </span>
              </>
              : <></>
          }
        </div>
      </div>
    </>
  )
};

export default PrimeStatusBar;
