import React from "react";
import { ProductSection } from "../../models/home";

interface IProps {
    bubblesData: ProductSection[];
}

export const ConcernBubbles = ({bubblesData} : IProps) => {

    const handleOnClickBubble = (handle) => {
        window.location.href = window.location.origin + `/collections/frontpage?collection=${handle}`;
    }

    if(bubblesData && bubblesData.length > 0){
        return (
            <div className={`bubbles-supersale`}>
                {
                    bubblesData.map((item, index) => (
                        <a key={index} className="all-categories-title" href={`#scalloped-box-${index}`} onClick={() => handleOnClickBubble(index)}>
                            <div className="icon-img" >
                                <img src={item.img} alt={`OZiva ${item.title}`} className='bubble-image' />
                            </div>
                            <div className="bubble-title">{item.title}</div>
                        </a>
                    ))
                }
            </div>
        )
    }
    return <></>

}