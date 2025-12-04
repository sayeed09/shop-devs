import React, { useState, useContext } from 'react';
import { MultiSelectionItem } from '../../components/product-advice/selectionItem';
import { getConcernsFromGoals } from '../../services/product-advice';

import { ProductAdviceContext } from '../../context/product-advice';
import { setConcerns } from '../../actions/product-advice';
import { IConcernListState, ICustomerGoalObj, EIsComponent } from '../../interface/product-advice';
import {
  Moengage,
} from '../../utils/tracking/gaTracking';


interface IGoalComponentProps {
  activeComponent: any;
  setActiveComponent: (value) => void;
  gender: string;
  listData: ICustomerGoalObj;
  setSelectGoals:(value)=> void;
  selectGoals:string[]
  selectConcern:IConcernListState[]
  setSelectConcern:(value)=> void;
}

const Goal = (props: IGoalComponentProps) => {
  const { activeComponent, setActiveComponent, selectGoals,setSelectGoals, gender, listData, setSelectConcern } = props;
  const { state, dispatch } = useContext(ProductAdviceContext);

  const next = (payload) => {
    let temp = activeComponent;
    temp.step2 = EIsComponent.done;
    temp.step3 = EIsComponent.active;
    setActiveComponent(temp);
    getConcernsFromGoals(payload).then((response: any) => {
      dispatch(setConcerns(response));
    });

    const eventName = 'product_advice_step_2';
    const eventAttributes = {
      goal: payload?.goal?.toString()
    };
    Moengage.track_event(eventName, eventAttributes);
  };

  const onDivClick = () => {
    setSelectGoals([]);
    setSelectConcern([]);
    if (selectGoals.length) {
      let temp = { ...activeComponent };
      temp.step1 = EIsComponent.done;
      temp.step2 = EIsComponent.active;
      temp.step3 = EIsComponent.empty;
      setActiveComponent(temp);
    }
  };

  const onGoalHandleChange = (value: string) => {
    let temp: string[] = [...selectGoals];
    if (!temp?.some((obj) => obj == value)) {
      if (temp?.length == 1) {
        temp.shift();
        temp.push(value);
      } else {
        temp.push(value);
      }
      setSelectGoals(temp);
    } else {
      temp = temp.filter((obj) => obj != value);
      setSelectGoals(temp);
    }
  };

  return (
    <li className={'step ' + props?.activeComponent?.step2}>
      <div className="step-title waves-effect" onClick={onDivClick}>
        <strong>Please select your goal</strong>
        <span
          id="goal-blink"
          className={activeComponent.step2== EIsComponent.active? 'blink_me showHigh' : 'blink_me'}
        >
          (Please Select Any 1)
        </span>
      </div>
      <div className="step-content">
        {listData?.goal?.map((obj, i) => {
          return (
            <MultiSelectionItem
              key={i}
              goalList={selectGoals}
              changeEvent={onGoalHandleChange}
              value={obj.name}
              icon={obj.icon}
            />
          );
        })}
        <div className="step-actions" style={{ textAlign: 'center' }}>
          <button
            onClick={(e) => {
              next({ gender: gender, goal: selectGoals });
            }}
            className="btn or-btn waves-effect waves-dark gender-select-btn btn next-step"
            disabled={selectGoals?.length === 0}
          >
            Next Question
          </button>
        </div>
      </div>
    </li>
  );
};
export default Goal;
