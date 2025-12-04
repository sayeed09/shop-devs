import React, { useState } from "react";
import { SuperSaleJSON } from "../../utils/supersale/constant";

export const HeaderBubbles = () => {

    const [activeBubble, setActiveBubble] = useState(0);

    if (SuperSaleJSON && SuperSaleJSON?.spotlightCollections.length > 0) {
        return (
            <div className="bubbles-supersale">
                {
                    SuperSaleJSON.spotlightCollections.map((item, index) => (
                        <a key={index} className="all-categories-title" href={`#scalloped-box-${index}`}onClick={() => {
                            setActiveBubble(index);
                            const checkIfSectionPresent = document.getElementById(item.handle);
                            if(!checkIfSectionPresent){
                                
                            }
                        }}>
                            <div className="icon-img" style={activeBubble === index ? {border: '1px solid green'}: {border: '1px solid red'}}>
                                <img src={item.imgSrc} alt={`OZiva ${item.name}`} width={80} height={80} />
                            </div>
                            <div className="title" style={{ whiteSpace: 'break-spaces' }}>{item.name}</div>
                        </a>
                    ))
                }
            </div>
        );
    }
}