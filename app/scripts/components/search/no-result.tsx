import React from "react";


const NoResultView = ({ searchTerm }: { searchTerm: string }) => (<div className="no-results-container">
    <img className="search-icon" src="https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319435.svg?v=1727268841" />
    <div className="no-result-txt">{`No results found for “${searchTerm}”`}</div>
    <div className="sub-txt">Until then, Explore our Bestseller’s</div>
</div>)

export default NoResultView;