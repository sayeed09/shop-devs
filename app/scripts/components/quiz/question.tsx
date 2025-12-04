import React, { useEffect, useRef } from 'react';
import { Question as QuestionModel } from '../../models/quiz/quiz-response';
import { SaveUserRequestModel } from '../../models/quiz/quiz-request';
import { OptionTypes } from '../../utils/quiz/provider';

interface Props {
  question: QuestionModel;
  userResponses: SaveUserRequestModel[];
  setUserResponses: React.Dispatch<
    React.SetStateAction<SaveUserRequestModel[]>
  >;
  inputFieldErr: boolean;
  setInputFieldErr: (showError: boolean) => void;
  isMulti?: boolean;
}
const Question = ({
  question,
  userResponses,
  setUserResponses,
  inputFieldErr,
  setInputFieldErr,
  isMulti }: Props) => {
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (question.optionType.toLocaleUpperCase() == OptionTypes.Text && !isMulti) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 1000)
    }
  }, [question])

  const userResponse = userResponses.find(
    (item) => item.questionId == question.id,
  );

  const handleSelection = (value: string | number) => {
    const currentValue = value.toString();
    const currentResponse = userResponse;
    if (currentResponse) {
      // user has already answered to the question
      const updatedUserResponses = userResponses.map((item) => {
        if (item.questionId == question.id) {
          let filteredResponse: string[] = [];
          // for handling multiselect
          if (question.optionType.toLocaleUpperCase() == OptionTypes.Checkbox) {
            //  remove already selected option
            if (item.response.includes(currentValue)) {
              filteredResponse = [
                ...item.response.filter(
                  (responseItem) => responseItem != currentValue,
                ),
              ];
            } else {
              filteredResponse = [...item.response, ...currentValue];
            }

            // handle for isExclusive
            const currentOption = question.options?.find((item) => item.id == value);
            if (currentOption?.isExclusive) {
              filteredResponse = [...currentValue];
            } else {
              const isExclusiveOptionPresent = question.options?.filter((item) => item.isExclusive);
              if (isExclusiveOptionPresent && isExclusiveOptionPresent?.length > 0) {
                filteredResponse = filteredResponse.filter((item) => !isExclusiveOptionPresent.find((opt) => opt.id.toString() == item))
              }
            }
            // end for isExclusive


          } else {
            //  text and radio option types
            filteredResponse = [currentValue];
          }

          return {
            ...item,
            response: filteredResponse,
          };
        }
        return item;
      }) as SaveUserRequestModel[];
      setUserResponses([...updatedUserResponses]);
    } else {
      const response: SaveUserRequestModel = {
        questionId: question.id,
        response: [currentValue],
        responseType: question.optionType.toLocaleUpperCase(),
      };
      setUserResponses([...userResponses, response]);
    }
    setInputFieldErr(false);
  };
  const optionsWithImg = question.options && question.options?.filter((item) => item.image).length > 0 ? true : false
  return (
    <>
      <div className={isMulti ? "muti mb-16" : question.optionType.toLocaleUpperCase()
        == OptionTypes.Multi ? 'mb-16' : "mb-64"}>
        <h2>
          {question.label}{' '}
          {question.optionType.toLocaleUpperCase() == OptionTypes.Checkbox && (
            <span className="heading-sub-text">(Multi select)</span>
          )}
        </h2>
        {question.subText &&
          <p className="sub-heading"> {question.subText}</p>}
        {/* text input */}
        {question.optionType.toLocaleUpperCase() == OptionTypes.Text && (
          <label>
            <input
              type="text"
              ref={inputRef}
              placeholder="Please enter here"
              style={{ width: '100%' }}
              onChange={(e) => handleSelection(e.target.value)}
              value={userResponse ? userResponse.response[0] : ''}
              className={`quiz-input-box ${inputFieldErr ? 'validate-info-input' : ''
                } `}
            />
            {inputFieldErr && (
              <div className="validate-info">{question?.errorText || "Please enter a valid input"} </div>
            )}
            {question.supportingText && (
              <div className="sub-heading" style={{ marginTop: '10px' }}>{question.supportingText}</div>
            )}
          </label>
        )}
        {/* single selction  */}
        {question.optionType.toLocaleUpperCase() == OptionTypes.Radio && (
          <div className={`quiz-opt-section quiz-multi-select-small ${optionsWithImg ? 'quiz-opt2-section' : 'quiz-opt4-section'}`}>
            {question.options &&
              question.options.map((option) => {
                return (
                  <button
                    onClick={() => {
                      handleSelection(option.id);
                    }}
                    key={option.id}
                    className={
                      userResponse?.response.includes(option.id.toString())
                        ? 'active'
                        : ''
                    }
                  >
                    {option.image ? (
                      <img src={option.image} />
                    ) : (
                      <img
                        src={`https://carbon.prod.oziva.in/static/images/${userResponse?.response.includes(option.id.toString())
                          ? 'round_checkboxes-checked.svg'
                          : 'round_checkboxes.svg'
                          }`}
                        alt=""
                      />
                    )}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            {inputFieldErr && (
              <div className="validate-info">Please make selection</div>
            )}
          </div>
        )}
        {/* multselect question */}
        {question.optionType.toLocaleUpperCase() == OptionTypes.Checkbox && (
          <div className="quiz-opt-section quiz-opt4-section quiz-multi-select-small">
            {question.options &&
              question.options.map((option) => {
                return (
                  <button
                    onClick={() => handleSelection(option.id)}
                    key={option.id}
                    className={
                      userResponse?.response.includes(option.id.toString())
                        ? 'active'
                        : ''
                    }
                  >
                    <span>{option.label}</span>
                  </button>
                );
              })}
            {inputFieldErr && (
              <div className="validate-info">Please make selection</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
