import React from "react";
import parse from 'html-react-parser';

interface IProps { 
    title: string | JSX.Element;
    subTitle?: string | JSX.Element;
};
export const SectionHeader = ({ title, subTitle }: IProps) => {
    return title ? <>
        <div className="sec-header">{typeof (title) == "string" ? parse(title) : title}</div>
        {subTitle ? <div className="sub-title">{subTitle}</div> : null}
    </> : null
}