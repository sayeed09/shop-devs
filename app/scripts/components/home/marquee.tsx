import React from 'react';
import { HighlightsSection } from '../../models/home';

interface IProps {
    hightlightsData: HighlightsSection | undefined;
}

const Marquee = ({ hightlightsData }: IProps) => {

    if(hightlightsData && hightlightsData?.data && hightlightsData?.data?.length > 0){
        return (
            <div className="marquee">
                {Array.from({ length: 3 }).map((_, index) => {
                    return (
                        <div className="marquee-item" key={index}>
                            {
                                (hightlightsData?.data ?? []).map((word, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <img src={hightlightsData.separator} alt="Animated Icon" />
                                            <div className='animated-word'>{word}</div>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        );
    }

    return <></>
};

export default React.memo(Marquee);