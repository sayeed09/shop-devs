import React from 'react';
import Collection from '../../views/collection';

interface IProps {
    collections: any;
    index: number;
    isHorizontal: boolean;
}

const SectionContainer = ({ collections, isHorizontal }: IProps) => {    
    return (
        <div key={collections.handle} id={`${collections.handle}`} className='collection-section'>
            <div className={`scalloped-inner-box`}>
                <div className='collection-title'>{collections.title}</div>
                <div className='collection-subtitle'>{collections.subtitle}</div>
                <Collection handle={collections.handle} hideCollectionTitle={true} hideQuickBuyCard={true}
                    disableLoadMore={true}
                    fetchLimit={6}
                    isHorizontal={isHorizontal}
                />
            </div>
        </div>
    )
}

export default React.memo(SectionContainer)