import React, { useEffect, useState } from 'react';
import Gender from './gender';
import Goal from './goal';
import Concern from './concern';
import RecommendProductList from './recommendProductList';

import {
  IConcernListState,
  ICustomerGoalObj,
  IRecommendProductDetails,
} from '../../interface/product-advice';
import { getRecommendation } from '../../services/product-advice';

import { getProductGoals } from '../../services/product-advice';

import '../../scss/oziva-product-advice.scss';
import AdviceHeader from './product-advice-header';

import { Provider as ProductAdviceProvider } from '../../context/product-advice';
import { Provider as GAProvider } from '../../context/gatracking';

import Loader from '../cart/loader';
import LovedByThousands from './lovedByThousands';
import AdviceFaq from './adviceFaq';

const ProductAdviceView = () => {
  const [gender, setGender] = useState<string>('');
  const [showLoader, setShowLoader] = useState(false);
  const [isInitialLoading, setInitialLoading] = useState(true);
  const [goalList, setGoalList] = useState<ICustomerGoalObj[]>([]);
  const [selectGoals, setSelectGoals] = useState<string[]>([]);
  const [recommendList, setRecommendList] = useState<
    IRecommendProductDetails[]
  >([]);
  const [selectConcern, setSelectConcern] = useState<IConcernListState[]>([]);
  const [activeComponent, setActiveComponent] = useState({
    step1: 'active',
    step2: '',
    step3: '',
  });

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = async () => {
    try {
      const goals: any = await getProductGoals();
      goals.data?.sort((a, b) => {
        if (a.gender > b.gender) {
          return 1;
        }
        if (b.gender > a.gender) {
          return -1;
        }
        return 0;
      });
      goals?.data ? setGoalList(goals.data) : '';
      setInitialLoading(false);
    } catch (error) {
      setInitialLoading(false);
    }
  };

  const getRecommendProduct = async (concernList: IConcernListState[]) => {
    setShowLoader(true);
    let newConcernIds: number[] = [];
    concernList.map((obj) => {
      newConcernIds.push(obj?.id);
    });

    let concern = {
      concerns: newConcernIds,
    };
    try {
      let response: any = await getRecommendation(concern);
      setShowLoader(false);
      if (response?.data?.length == 0) {
        window.alert('Please choose again..');
      } else {
        setRecommendList(response?.data || []);
      }
    } catch (error) {
      console.log('error', error);
      setShowLoader(false);
    }
  };

  let goalListData;
  goalList?.map((obj: ICustomerGoalObj) => {
    if (obj.gender == gender) {
      goalListData = obj;
    }
  });
  if (isInitialLoading) {
    return <Loader />;
  }
  return (
    <ProductAdviceProvider>
      <GAProvider>
      {recommendList.length == 0 && !isInitialLoading && (
        <div className="product-advice-steps">
          <AdviceHeader />
          <div>
            <ul className="stepper linear">
              <Gender
                gender={gender}
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                goalList={goalList}
                setGender={setGender}
                selectGoals={selectGoals}
                setSelectGoals={setSelectGoals}
                setSelectConcern={setSelectConcern}
              />

              <Goal
                gender={gender}
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                listData={goalListData}
                selectGoals={selectGoals}
                setSelectGoals={setSelectGoals}
                selectConcern={selectConcern}
                setSelectConcern={setSelectConcern}
              />

              <Concern
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                getRecommendProduct={getRecommendProduct}
                selectConcern={selectConcern}
                setSelectConcern={setSelectConcern}
              />
            </ul>
          </div>
        </div>
      )}
      {recommendList?.length > 0 && (
        <>
          <RecommendProductList
            recommendList={recommendList}
            gender={gender}
            selectGoals={selectGoals}
            selectConcern={selectConcern}
            setRecommendList={setRecommendList}
            setGender={setGender}
            setSelectGoals={setSelectGoals}
            setSelectConcern={setSelectConcern}
            setActiveComponent={setActiveComponent}
          />
          <LovedByThousands />
          <AdviceFaq />
        </>
      )}
      {showLoader && <Loader />}
      </GAProvider>
    </ProductAdviceProvider>
  );
};
export default ProductAdviceView;
