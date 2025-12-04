import React from 'react';

export default function SatisfactionGuaranteed() {
    return (
        <>
            <div id="satisfaction-guaranteed" className={'grey'}>
                <div>
                    <img className='satisfacion-image' width={35} src='https://cdn.shopify.com/s/files/1/2393/2199/files/Group_6123.png?v=1733998599' />
                </div>
                <div style={{marginLeft: '6px'}}>
                    <span><strong style={{fontWeight: '500'}}>Satisfaction Guaranteed with OZiva</strong></span>
                    <div style={{ display: 'block'}}>
                        Trusted by over
                        <img style={{ margin: '0 4px', verticalAlign: 'sub' }} width={14} height={14} src='https://cdn.shopify.com/s/files/1/2393/2199/files/Tick_mark_grey.png?v=1733983599'/>
                        <strong style={{fontWeight: '500'}}>
                            1 million customers worldwide.
                        </strong>
                    </div>
                </div>
            </div>
            <div id="satisfaction-guaranteed" className={'green'}>
                <div>
                    <img className='satisfacion-image' width={35} src='https://cdn.shopify.com/s/files/1/2393/2199/files/Group_6123-1.png?v=1733998599'/>
                </div>
                <div style={{marginLeft: '6px'}}>
                    <span><strong style={{fontWeight: '500'}}>Satisfaction Guaranteed with OZiva</strong></span>
                    <div style={{ display: 'block'}}>
                        Trusted by over
                        <img style={{ margin: '0 4px', verticalAlign: 'sub' }} width={14} height={14} src='https://cdn.shopify.com/s/files/1/2393/2199/files/Tickmark-white.png?v=1733983599'/>
                        <strong style={{fontWeight: '500'}}>
                            1 million customers worldwide.
                        </strong>
                    </div>
                </div>
            </div>
        </>
    );
}