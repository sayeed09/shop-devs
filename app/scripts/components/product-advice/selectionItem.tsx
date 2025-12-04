import React from 'react';

interface ISelectionItem {
  value: string;
  groupName: string;
  icon: string;
  changeEvent: (value: string) => void;
  checkedValue:string;

}

interface IMultiSelectionItem {
  value: string;
  icon: string;
  goalList: string[];
  changeEvent: (value: string) => void;
}

export const SelectionItem = (props: ISelectionItem) => {  
  return (
    <>
      <div className="option-holder">
        <label htmlFor={props.value} className="f9 flex-center-align">
          <input
            id={props.value}
            value={props.value}
            type="radio"
            onChange={() => props.changeEvent(props.value)}
            checked={props.checkedValue==props.value || false}
          />
          <label htmlFor={props.value}>{props.value}</label>
        </label>
        <div
          className="f1 flex-center-align"
          style={{ justifyContent: 'center' }}
        >
          <img src={props.icon} />
        </div>
      </div>
    </>
  );
};

export const MultiSelectionItem = (props: IMultiSelectionItem) => {
  return (
    <>
      <div className="option-holder">
        <label htmlFor={props.value} className="f9 flex-center-align">
          <input
            id={props.value}
            value={props.value}
            type="radio"
            checked={props.goalList?.some((obj) => obj == props.value) || false}
            onChange={() => {}}
            onClick={(e) => props.changeEvent(props.value)}
          />
          <label htmlFor={props.value}>{props.value}</label>
        </label>
        <div
          className="f1 flex-center-align"
          style={{ justifyContent: 'center' }}
        >
          <img src={props.icon} />
        </div>
      </div>
    </>
  );
};
