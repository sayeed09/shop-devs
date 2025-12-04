import React, { useEffect, useState } from "react";
import { productService } from "../../services/product";
import { Collections } from "../../models/home";


interface Props {
    handleConcernSelect: (collection: Collections) => void;
    selectedCollection: Collections;
    concernCategoryCollection: Collections[];
}
const Concerns = ({ handleConcernSelect, selectedCollection, concernCategoryCollection }: Props) => {


    return <div className="concern-container">
        <div className="header">
            Discover solutions for better health
        </div>
        <div className="list">
            {concernCategoryCollection.map((item) => <div onClick={() => handleConcernSelect(item)} key={item.handle}
                className={`item ${selectedCollection.handle === item.handle ? 'active' : ''}`}>{item.name}</div>)}
        </div>
    </div>
}
export default Concerns;