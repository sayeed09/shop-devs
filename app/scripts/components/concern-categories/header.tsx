import React, { useEffect, useRef, useState } from 'react'
import { productService } from '../../services/product';
import { ResponsiveImage } from '../productCard/responsive-image';
import { collectionService } from '../../services/collection';
import { CollectionByHandleData, Collections } from '../../models/home';
import { Moengage } from '../../utils/tracking/gaTracking';
import { isMobile } from '../../utils/helper';
import { bubbleImageBreakPoints } from '../../utils/data-provider';
import { PRODUCT_FETCH_LIMIT } from '../../utils/concern-category/constants';

interface IProps {
    groupType: string;
    setSelectedGoal: (selectedGoal: string) => void;
    selectedGoal?: string;
    collectionHandle: any;
    setConcernTitle?: (concernTitle: { title: string, handle: string }) => void;
    setBannerImageL1: React.Dispatch<React.SetStateAction<String | undefined>>;
}

const ConcernCategoryHeader = ({ groupType, setSelectedGoal, selectedGoal, collectionHandle, setConcernTitle, setBannerImageL1 }: IProps) => {

    const urlPath = window.location.pathname;
    const isConcern = urlPath.indexOf('concerns') > -1;

    const [concernCategoryCollection, setConcernCategoryCollection] = useState<Collections[]>([]);
    const [selectedCollection, setSelectedCollection] = useState(collectionHandle);
    const [collectionData, setCollectionData] = useState<CollectionByHandleData>();

    useEffect(() => {
        productService.getConcernCategoryData(groupType)
            .then((data) => {
                setConcernCategoryCollection(data.data.collections);
                if (!selectedCollection) {
                    setSelectedCollection(data.data.collections[0].handle);
                }
            });

    }, []);

    useEffect(() => {
        if (collectionHandle) setSelectedCollection(collectionHandle)
    }, [collectionHandle])

    const getCollectionProducts = async (handle: string) => {
        const responseData =
            await collectionService.fetchProductsByCollectionHandle(
                handle,
                1,
                PRODUCT_FETCH_LIMIT,
            );

        setCollectionData(responseData.data);
        setConcernTitle && setConcernTitle({ title: responseData.data.title, handle: responseData.data.handle });
        if (isConcern) {
            const firstSelectedGoal = responseData.data.subCollections[0].handle;
            setSelectedGoal(firstSelectedGoal);
            const banners = responseData.data?.banners;
            setBannerImageL1(banners.length > 0 ? isMobile() ? banners[0].mobileImage : banners[0].desktopImage : undefined)
        } else {
            setSelectedGoal(responseData.data.handle);
        }
    };

    useEffect(() => {
        if (selectedCollection) getCollectionProducts(selectedCollection);
        else if (collectionHandle) getCollectionProducts(collectionHandle);
    }, [selectedCollection, collectionHandle]);

    const handleGoalClick = (concernGoal: Collections) => {
        setSelectedGoal(concernGoal.handle);
        (window as any).Moengage.track_event('concern_goal_tab', {
            goal: concernGoal.name,
            handle: concernGoal.handle,
        });
    }

    const showBubbles = () => {
        const urlPathname = window.location.href.indexOf('/collections') > -1 ? window.location.pathname.split('/collections') : window.location.href.indexOf('/concerns') ? window.location.pathname.split('/concerns') : null;

        if (urlPathname && urlPathname[1] === '') {
            return true
        } else {
            return false
        }
    }

    const topHeight = document.getElementById('shopify-section-new-header')?.clientHeight || 60;
    console.log(selectedCollection, 'selectedCollection')

    return (
        <>
            <div className={`${!showBubbles() && !isConcern ? 'concern-border' : 'concerns-goals'} ${!isConcern && showBubbles() ? 'bubbles-container-border' : ''}`}>
                {showBubbles() && <div className={'bubbles-container'}>
                    {
                        concernCategoryCollection.length > 0 && concernCategoryCollection.map((collection) => {
                            return (
                                <div key={collection.handle} className={collection.handle === selectedCollection ? 'active-bubble' : 'bubbles'} onClick={() => {
                                    setSelectedCollection(collection?.handle);
                                }}>
                                    <ResponsiveImage imageURL={collection.imgSrc} widthHeightObject={bubbleImageBreakPoints} altText={collection.name} />
                                    <p className='bubble-name'>{collection.name}</p>
                                </div>
                            )
                        })
                    }
                </div>}

                {
                    showBubbles() && !isMobile() && isConcern &&
                    <div className='horizontal-line'>
                        <hr />
                    </div>
                }
            </div>
            {
                isConcern && collectionData?.subCollections && collectionData?.subCollections.length > 0 ?
                    <div className='goal-container'>
                        {
                            collectionData?.subCollections?.map((concernGoal) => {
                                return (
                                    <div className={`goal-item ${selectedGoal == concernGoal.handle ? 'active' : ''}`} onClick={() => handleGoalClick(concernGoal)} key={concernGoal.name}>
                                        {concernGoal.name}
                                    </div>
                                )
                            })
                        }
                    </div> :
                    <></>
            }
        </>
    )
}

export default ConcernCategoryHeader;