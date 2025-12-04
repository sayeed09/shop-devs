import React from "react";

export default function Section3() {
    return(
        <section className='uds-600'>
            <div className="sec-header">
                <p>
                    <strong>
                        How OZiva Vegan Collagen
                    </strong> works
                </p>
            </div>
            <div style={{marginTop: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: '#F5F5F5', marginLeft: -20, marginRight: -20}}>
                    <img style={{width: '120px', padding: '20px'}} src="https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319714.png?v=1741549402"/>
                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Vector_2_1.svg?v=1741610485"/>
                    <div style={{flex: 0.9, alignItems: 'center', fontSize: 14, justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                        <p style={{margin: 0, fontWeight: 'bold', padding: '2px 8px', background: '#004141', color: 'white', borderRadius: '4px'}} className="section-title-background">Phase 1</p>
                        <p style={{marginTop: 8}}>Polyphenols will reach the skin through bloodstream</p>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: '#FFFFFF', marginLeft: -20, marginRight: -20}}>
                    <img style={{width: '120px', padding: '20px'}} src="https://cdn.shopify.com/s/files/1/2393/2199/files/abstract-yellow-bubbles-texture_1.png?v=1741549404"/>
                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Vector_2_1.svg?v=1741610485"/>
                    <div style={{flex: 0.9, alignItems: 'center', fontSize: 14, justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                        <p style={{margin: 0, fontWeight: 'bold', padding: '2px 8px', background: '#004141', color: 'white', borderRadius: '4px'}} className="section-title-background">Phase 2</p>
                        <p style={{marginTop: 8}}>Free radicals get stabilized</p>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: '#F5F5F5', marginLeft: -20, marginRight: -20}}>
                    <img style={{width: '120px', padding: '20px'}} src="https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319715_8bb93590-6b6c-4929-b2f7-86330ef85918.png?v=1741549418"/>
                    <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Vector_2_1.svg?v=1741610485"/>
                    <div style={{flex: 0.9, alignItems: 'center', fontSize: 14, justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                        <p style={{margin: 0, fontWeight: 'bold', padding: '2px 8px', background: '#004141', color: 'white', borderRadius: '4px'}} className="section-title-background">Phase 3</p>
                        <p style={{marginTop: 8}}>Reduces collagen damage & improves natural collagen syntesis</p>
                    </div>
                </div>
            </div>
        </section>
    );
}