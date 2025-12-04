import React from "react";

export default function Section4() {
    return(
        <section className='uds-600' style={{margin: '24px 0'}}>
            <div className="sec-header" style={{marginBottom: 4}}>
                <p>
                    <strong>Pour. Stir. Delight</strong>
                </p>
            </div>
            <span>
                How to use OZiva Vegan Collagen 
            </span>
            <div>
                <div style={{textAlign: 'center', marginTop: 20, color: '#006E5A'}}>
                    Daily in <strong>150-200ml of water</strong>
                </div>
                <div style={{
                    position: 'relative',
                    textAlign: 'center'
                    }}>
                    <div style={{textAlign: 'center', color: '#006E5A', position: 'absolute', bottom: '15%', left: 0, }}>
                        <strong>1 scoop (6g)</strong>
                    </div>
                    <img style={{position: 'absolute',top: 0,left: '15%',right: '15%',width: '75%'}} src="https://cdn.shopify.com/s/files/1/2393/2199/files/circle_dot.svg?v=1741602074"/>
                    <img style={{width: '40%',marginTop: '40px'}} src="https://cdn.shopify.com/s/files/1/2393/2199/files/image_632.png?v=1741591915"/>
                    <div style={{textAlign: 'center', color: '#006E5A', position: 'absolute', bottom: '15%', right: 0, }}>
                        <strong>3 months</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}