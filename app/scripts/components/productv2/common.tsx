import React from "react";

interface IProps {
    title: string | JSX.Element;
    subTitle?: string | JSX.Element;
}

export const SectionHeader = ({ title, subTitle }: IProps) => {
    if (!title) return null;

    const renderContent = (value: string | JSX.Element) => {
        if (typeof value === "string") {
            return (
                <div
                    className="sec-header"
                    dangerouslySetInnerHTML={{ __html: value }}
                />
            );
        }
        return <div className="sec-header">{value}</div>;
    };

    return (
        <>
            {renderContent(title)}

            {subTitle && (
                <div className="sub-title">
                    {typeof subTitle === "string"
                        ? <span dangerouslySetInnerHTML={{ __html: subTitle }} />
                        : subTitle}
                </div>
            )}
        </>
    );
};
