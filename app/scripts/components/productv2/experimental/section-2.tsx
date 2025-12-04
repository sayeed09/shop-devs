import React from 'react';

const Section2 = () => {
    return (
        <section className='uds-600'>
            <div className='sec-header'>
                <p>
                    <strong>Better than</strong> Marine Collagen
                </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative',flexDirection: 'row-reverse', gap: 4}}>
                <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/close-up-beverage-golden-bubbles_1.png?v=1741548806'} alt="Side by side" style={{ width: '50%', marginRight: '-16px' }} />
                <p style={{fontSize: '13px', margin: 0}}>
                    <strong>Marine Collagen only refills lost collagen </strong> & creates dependency of the body
                </p>
                <img style={{position: 'absolute', left: '10%', bottom: '5%'}} src="https://cdn.shopify.com/s/files/1/2393/2199/files/Vector_2.svg?v=1741610258"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', gap: 4}}>
                <img src={'https://cdn.shopify.com/s/files/1/2393/2199/files/Marine-Collagen_2.png?v=1741548828'} alt="Side by side" style={{ maxWidth: '50%', width: 100 }} />
                <p style={{color:'#006E5A', fontSize: '13px', margin: 0}}>
                    <strong>OZiva Vegan Collagen with Clinically Proven CollabZen</strong> trains the body to build its own collagen & refills lost collagen. Best for sustainable results.
                </p>
                <img style={{position: 'absolute', right: '10%', top: '-25%'}} src='https://cdn.shopify.com/s/files/1/2393/2199/files/Vector_3.svg?v=1741610312' />
            </div>
        </section>
    );
};

export default Section2;