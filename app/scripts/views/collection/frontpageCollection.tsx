import React, { useEffect, useState } from 'react';
import '../../scss/import/_collection.scss';
import '../../scss/oziva-site.scss';
import '../../scss/import/_skeleton.scss';
import '../../scss/import/_concern-category.scss';
import '../../scss/import/_collection.scss';
import '../../scss/home-style.scss';
import '../../scss/oziva-search-product-page.scss';
import Collection from '../collection';
import { Bubbles } from '../../components/home/bubbles';
import { productService } from '../../services/product';
import { STATIC_COLLECTION } from '../../utils/concern-category/constants';
import { Collections as ConcernCollection } from "../../models/home";

const FrontpageCollection = () => {

  const [concerns, setConcerns] = useState<ConcernCollection[]>();
  const [selectedCollection, setSelectedCollection] = useState('')

  const getConcernsData = async() => {
    const {data} = await productService.getConcernCategoryData('CONCERN');
    const collections = data.collections;
    setConcerns([...STATIC_COLLECTION, ...collections]);
  }

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const cHandle = url.get('collection');
    getConcernsData();
    if (cHandle) {
      setSelectedCollection(cHandle);
      setTimeout(() => {
        const element = document.getElementById(cHandle);
        element?.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
      }, 500);
    } else {
      setSelectedCollection(STATIC_COLLECTION[0]?.handle);
    }
  }, []);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    url.set('collection', selectedCollection);
    window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${url}`));
  }, [selectedCollection]);


  return(
    <>
      <div className='concerns-goals'>
        <div className={'bubbles-container'}>
          {concerns && concerns?.map((item, index) => {
          return(
              <Bubbles collection={item} selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection}/>
            )
          })}
        </div>
      </div>
      {selectedCollection && <Collection handle={selectedCollection}/>}
    </>
  );
}

export default FrontpageCollection;