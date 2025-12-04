import React, { useEffect, useState } from 'react';
import { ScallopedWrapper } from './scalloped-wrapper';
import Collection from '../../views/collection';
import { isMobile } from '../../utils/helper';
import { SuperSaleJSON } from '../../utils/supersale/constant';

interface IProps {
    collections: any;
    index: number;
    sectionRefs: any;
    isHorizontal: boolean;
}

const CollectionSection = ({ collections, index, sectionRefs, isHorizontal }: IProps) => {


    const getStlye = () => {
        if(index !== 0){
            if(collections?.properties?.footerImageDesktop || collections?.properties?.footerImageMobile){
                return { marginTop: '0' };
            }else if(index !== SuperSaleJSON.spotlightCollections.length - 1){
                return { marginBottom: '172px' };
            }else{
                return { marginBottom: '100px' }
            }
        }else{
            return { paddingTop: '64px' };
        }
    }
    return (
        <div ref={(el) => (sectionRefs.current[index] = el)} key={collections.handle} id={`${collections.handle}`} className='collection-section'>
            <ScallopedWrapper bgColor={collections?.properties?.background} showTopScallopedDesign={index !== 0} >
                <div style={getStlye()} className='scalloped-box' id={`scalloped-box-${index}`}>
                    <div className={`scalloped-inner-box`}>
                        <div className='collection-title'>{collections.name}</div>
                        <div className='collection-subtitle'>{collections.subTitle}</div>
                        <Collection handle={collections.handle} hideCollectionTitle={true} backgroundColor={collections.properties.background} hideQuickBuyCard={true} 
                            disableLoadMore={true}
                            fetchLimit={8}
                            isHorizontal={isHorizontal}
                        />
                    </div>
                </div>
            </ScallopedWrapper>
            {collections.handle && (collections?.properties?.footerImageDesktop || collections?.properties?.footerImageMobile) ? <div className='footer-banner'>
                <img src={isMobile() ? collections.properties.footerImageMobile : collections.properties.footerImageDesktop} alt={`Footer - ${collections.handle}`} />
            </div> : null}
        </div>
    )
}

export default React.memo(CollectionSection)