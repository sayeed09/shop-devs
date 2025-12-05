import React, { useContext } from 'react';
import { SelectionItem } from '../../components/product-advice/selectionItem';
import { ICustomerGoalObj, EIsComponent } from '../../interface/product-advice';
import {
  Moengage,
} from '../../utils/tracking/gaTracking';

interface IGenderComponentProps {
  activeComponent: any;
  setActiveComponent: (value) => void;
  gender: string;
  setGender: (value) => void;
  goalList: ICustomerGoalObj[];
  setSelectGoals:(value)=> void;
  setSelectConcern:(value)=>void;
  selectGoals:string[]
}

const Gender = (props: IGenderComponentProps) => {
  const {
    activeComponent,
    setActiveComponent,
    setSelectGoals,
    gender,
    setGender,
    goalList,
    setSelectConcern
  } = props;

  const onHandleChange = async (value: string) => {
    setGender(value);
  };

  const next = () => {
    let temp = { ...activeComponent };
    temp.step1 = EIsComponent.done;
    temp.step2 = EIsComponent.active;
    setActiveComponent(temp);

    const eventName = 'product_advice_step_1';
    const eventAttributes = {
      gender:gender
    };
      
    (window as any).Moengage.track_event(eventName, eventAttributes);

  };

  const onDivClick = () => {
    setSelectGoals([])
    setSelectConcern([])
    setGender('');
    let temp = { ...activeComponent };
    temp.step1 = EIsComponent.active;
    temp.step2 = EIsComponent.empty;
    temp.step3 = EIsComponent.empty;
    setActiveComponent(temp);
  };

  return (
    <li className={'step ' + activeComponent?.step1}>
      <div className="step-title waves-effect" onClick={onDivClick}>
        <strong>Please select your gender</strong>
      </div>
      <div className="step-content">
        <div>
          {goalList?.map((obj: ICustomerGoalObj, i: number) => {
            return (
              <SelectionItem
                key={i}
                value={obj.gender}
                groupName="gender"
                changeEvent={onHandleChange}
                checkedValue={gender}
                icon={
                  obj.gender === 'male'
                    ? 'https://cdn.shopify.com/s/files/1/0366/1004/8044/t/39/assets/male_colored_icon.svg?v=89961927116365500371644986575'
                    : 'https://cdn.shopify.com/s/files/1/0366/1004/8044/t/39/assets/female_colored_icon.svg?v=89961927116365500371644986575'
                }
              />
            );
          })}
        </div>
        <div className="step-actions" style={{ textAlign: 'center' }}>
          <button
            onClick={(e) => {
              next();
            }}
            className="btn or-btn waves-effect waves-dark gender-select-btn btn next-step"
            disabled={gender === ''}
          >
            Next Question
          </button>
        </div>
      </div>
    </li>
  );
};
export default Gender;
