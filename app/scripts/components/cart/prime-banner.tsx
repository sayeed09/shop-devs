import React from 'react';
import ThreeMonthConsult from './three-month-consult';

export default function PrimeBanner({ price, compareAtPrice }) {

    return (
        <>
            <div className="prime-free-bee-section-footer">
                <hr />
                <ThreeMonthConsult />
            </div>

        </>
    );
}