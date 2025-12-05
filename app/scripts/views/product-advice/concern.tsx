import React, { useState, useContext } from 'react';
import { ProductAdviceContext } from '../../context/product-advice';
import { IConcern, IConcerns, EIsComponent } from '../../interface/product-advice';
import {
  Moengage,
} from '../../utils/tracking/gaTracking';

const Concerns = (props) => {
  const {
    activeComponent,
    getRecommendProduct,
    setActiveComponent,
    selectConcern,
    setSelectConcern,
  } = props;
  const { state, dispatch } = useContext(ProductAdviceContext);
  const [addBlink, setAddBlink] = useState(false);

  const onHandleChange = (id: number, gName: string, concernName: string) => {
    let temp = [...selectConcern];
    let newObj = { id: id, goalName: gName, concernName: concernName };
    if (!temp?.some((obj) => obj.id == id)) {
      if (temp?.some((obj) => obj.goalName == gName)) {
        temp = temp.filter((obj) => obj.goalName != gName);
      }
      if (temp?.length == 2) {
        temp.shift();
        temp.push(newObj);
      } else {
        temp.push(newObj);
      }
      setSelectConcern(temp);
    } else {
      temp = temp.filter((obj) => obj.id != id);
      setSelectConcern(temp);
    }
  };

  const onDivClick = () => {
    if (selectConcern.length) {
      let temp = { ...activeComponent };
      temp.step1 = EIsComponent.done;
      temp.step2 = EIsComponent.done;
      temp.step3 = EIsComponent.active;
      setActiveComponent(temp);
    }
  };

  const viewConcernList = (concernObj, conObj, i) => {
    let isActive = '';
    if (selectConcern.some((obj) => obj.id == conObj?.id)) {
      isActive = 'active';
    } else {
      isActive = '';
    }
    return (
      <li
        key={conObj?.id}
        className={'selection-boxes ' + isActive}
        data-id={i}
        onClick={(e) =>
          onHandleChange(conObj?.id, concernObj?.goal, conObj?.name)
        }
      >
        {conObj?.name}
      </li>
    );
  };

  return (
    <li className={'step ' + activeComponent?.step3}>
      <div className="step-title waves-effect" onClick={onDivClick}>
        <strong>Choose your concerns</strong>
        <span
          id="concern-blink"
          className={addBlink ? 'blink_me showHigh' : 'blink_me'}
        >
          (Please Select Any 1)
        </span>
      </div>
      <div className="step-content">
        <div>
          {state?.concerns?.data?.map(
            (concernListObj: IConcerns, i: number) => {
              return (
                <div key={i} className="title" data-goal={i}>
                  <ul>
                    <p style={{ marginBottom: 0 }}>{concernListObj?.goal}</p>
                    {concernListObj?.concerns?.map(
                      (concernObj: IConcern, i: number) => {
                        return viewConcernList(concernListObj, concernObj, i);
                      },
                    )}
                  </ul>
                </div>
              );
            },
          )}
        </div>
        <div className="step-actions" style={{ textAlign: 'center' }}>
          <button
            disabled={selectConcern.length == 0}
            onClick={(e) => {
              let concernNames:string[]=[]
              for (const iterator of selectConcern) {
                concernNames.push(iterator.concernName)
              }
              const eventName = 'product_advice_step_3';
              const eventAttributes = {
                concerns: concernNames.toString()
              };
              
              (window as any).Moengage.track_event(eventName, eventAttributes);
              getRecommendProduct(selectConcern);
            }}
            className="btn or-btn waves-effect waves-dark"
          >
            View Recommendation{' '}
          </button>
        </div>
      </div>
    </li>
  );
};
export default Concerns;
