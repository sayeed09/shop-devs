import React, { useState } from 'react'
import '../../../scripts/scss/import/_concern-category.scss';
import Collection from '../collection';
import ConcernCategoryHeader from '../../components/concern-categories/header';

const ConcernCategories = () => {

    const [selectedGoal, setSelectedGoal] = useState<string>();
    const [concernTitle, setConcernTitle] = useState<{ handle: string, title: string }>();
    const [bannerImageL1, setBannerImageL1] = useState<String>();

    let params = '';

    const urlPath = window.location.pathname;

    if (urlPath.split('concerns/').length > 0) {
        params = urlPath.split('concerns/')[1];
    }

    return (
        <>
            <ConcernCategoryHeader groupType='CONCERN' setSelectedGoal={setSelectedGoal} selectedGoal={selectedGoal}
                collectionHandle={params} setConcernTitle={setConcernTitle}
                setBannerImageL1={setBannerImageL1}
            />
            {selectedGoal && <Collection handle={selectedGoal} concernTitle={concernTitle?.title} bannerImageL1={bannerImageL1}
                fetchLimit={30} />}
        </>
    )
}

export default ConcernCategories;