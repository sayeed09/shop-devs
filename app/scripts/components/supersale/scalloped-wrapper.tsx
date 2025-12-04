import React from 'react';

interface ScallopedSectionProps {
    bgColor: string;
    children: React.ReactNode;
    showTopScallopedDesign: any;
}

export const ScallopedWrapper = ({ bgColor, children, showTopScallopedDesign }: ScallopedSectionProps) => {

    return (
        <div style={{ backgroundColor: bgColor, position: 'relative' }}>
            {showTopScallopedDesign ? <div className='scalloped-design scalloped-design-top' style={{backgroundImage: `radial-gradient(circle, ${bgColor} 50px, transparent 51px)`}}/> : null}

            <div style={{ position: 'relative' }}>
                {children}
            </div>

            <div className='scalloped-design scalloped-design-bottom' style={{backgroundImage: `radial-gradient(circle, ${bgColor} 50px, transparent 51px)`}}/>
        </div>
    );
};
