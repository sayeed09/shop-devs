import React, { useState } from "react";
import { Diagnosis } from "../../../models/quiz/quiz-response";
import parse from 'html-react-parser';
import { Moengage } from "../../../utils/tracking/gaTracking";

interface Props {
    diagnosis: Diagnosis[];
}

const RootCause = ({ diagnosis }: Props) => {
    const [selectedTab, setSelectedTab] = useState(diagnosis[0].label);

    const handleTabClick = (label: string) => {
        const eventName = `hair_test_result_${label.toLowerCase()}_tab_clicked`;
        const eventAttributes = {};
        Moengage.track_event(eventName, eventAttributes);
        setSelectedTab(label)
    }

    return <>
        <section className='homeSection quiz-result-tabs-sec'>
            <p className='h2 fw-bold'>Root Causes</p>
            <div className="container-block">
                <div className='quiz-result-tabs'>
                    <div className='quiz-result-tab-buttons'>
                        {diagnosis.map((item, index) => {
                            return <div onClick={() => handleTabClick(item.label)} className={`result-tab-button`} key={index}>
                                <div className={`tab ${selectedTab == item.label ? 'active' : ''}`}>
                                    <div className="result-tab-button-img">
                                        <img src={item.image} alt={item.label} />
                                    </div>
                                </div>
                                <div className="result-tab-button-title">{item.label}</div>
                            </div>
                        })}
                    </div>
                </div>
                <div className='quiz-result-tabs-content'>
                    <span className="title-txt pl-2">{selectedTab}</span>
                    <ul style={{ paddingLeft: 12 }}>
                        {diagnosis.find((item) => item.label == selectedTab)?.diagnosisList.map((item, index) => {
                            // if only table skip li 
                            if (item.startsWith('<table>')) return parse(item)
                            return <li key={index}>{parse(item)}</li>
                        })}
                    </ul>
                </div>
            </div>

        </section>


    </>
}
export default RootCause;