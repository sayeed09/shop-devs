import React, { useState } from 'react';
import Collection from '../../views/collection';
import AddtocartSnackbar from '../../components/productCardV1/addToCartSnackbar';

interface IProps {
    collections: any;
    index: number;
    sectionRefs: any;
    isHorizontal: boolean;
}

const CollectionSection = ({ collections, index, sectionRefs, isHorizontal }: IProps) => {

    const [showSnakBar, setShowSnakbar] = useState(false);

    const showSnakBarfunc = () => {
        if (showSnakBar) {
            setTimeout(() => {
                setShowSnakbar(false);
            }, 4000);
            return <AddtocartSnackbar />;
        }
    };

    return (
        <div ref={(el) => (sectionRefs.current[index] = el)} key={collections.handle} id={`${collections.handle}`} className='collection-section'>
            {showSnakBarfunc()}
            <div className='scalloped-box' id={`scalloped-box-${index}`}>
                <div className={`scalloped-inner-box`}>
                    <div className='collection-title'>{collections.title}</div>
                    <div className='collection-subtitle'>{collections.subtitle}</div>
                    <Collection handle={collections.handle} hideCollectionTitle={true} backgroundColor={'#FFF'} hideQuickBuyCard={true}
                        disableLoadMore={true}
                        fetchLimit={8}
                        isHorizontal={isHorizontal}
                        setShowSnakbar={setShowSnakbar}
                    />
                </div>
            </div>
        </div>
    )
}

export default React.memo(CollectionSection)