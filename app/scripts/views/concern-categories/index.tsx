import React, { useEffect, useState } from 'react';
import { useLocation } from "@remix-run/react";

import '../../../scripts/scss/import/_concern-category.scss';
import Collection from '../collection';
import ConcernCategoryHeader from '../../components/concern-categories/header';

const ConcernCategories = () => {
    const location = useLocation();                // ⭐ SSR-safe hook
    const urlPath = location.pathname;
    const [selectedGoal, setSelectedGoal] = useState<string>();
    const [concernTitle, setConcernTitle] = useState<{ handle: string, title: string }>();
    const [bannerImageL1, setBannerImageL1] = useState<string>();
    const [handle, setHandle] = useState(urlPath.includes('concerns/') ? urlPath.split('concerns/')[1] : '');
    useEffect(() => {
        setHandle(urlPath.includes('concerns/') ? urlPath.split('concerns/')[1] : '')
    }, [location])

    return (
        <>
            <ConcernCategoryHeader
                groupType="CONCERN"
                setSelectedGoal={setSelectedGoal}
                selectedGoal={selectedGoal}
                collectionHandle={handle}
                setConcernTitle={setConcernTitle}
                setBannerImageL1={setBannerImageL1}
            />

            {selectedGoal && (
                <Collection
                    handle={selectedGoal}
                    concernTitle={concernTitle?.title}
                    bannerImageL1={bannerImageL1}
                    fetchLimit={30}
                />
            )}
        </>
    );
};

export default ConcernCategories;