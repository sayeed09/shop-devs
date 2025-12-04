import React, { useContext, useState } from "react";
import { IconDescription } from "../../../models/product/productv2";
import { SectionHeader } from "../common";
import parse from 'html-react-parser';
import { GAContext } from "../../../context/gatracking";

interface Props {
    sectionHeader: string;
    iconDescriptions: IconDescription[];
    className: string;
}

const IconDescriptionComponent = ({ iconDescriptions, sectionHeader, className }: Props) => {
    const [selectedItem, setSelectedItem] = useState(iconDescriptions[0]);
    const gaTrackingEvent = useContext(GAContext);

    return <section className={`icon-description-sec ${className}`}>
        <SectionHeader title={sectionHeader} />
        <div className="content">
            <div className="icons-list">
                {iconDescriptions.map((item, index) => (<React.Fragment key={index}>
                    <div onClick={() => {
                        setSelectedItem(item)
                        gaTrackingEvent('pdp_article_click', { article_section: item.title });
                    }} key={item.title} className={`item ${selectedItem.title == item.title ? 'active' : ''}`}>
                        <img src={item.src} alt={item.title} />
                        <div className="title">{item.title}</div>
                        <span className="arrow-icon" />
                    </div>
                    {selectedItem.title === item.title &&
                        <div className={`description hide-on-web ${selectedItem.title == item.title ? 'active' : ''}`}>
                            {parse(item.description)}
                        </div>
                    }
                </React.Fragment>))}
            </div>
            <div className="description hide-on-mobile">
                {parse(selectedItem.description)}
            </div>
        </div >
    </section >
}
export default IconDescriptionComponent;