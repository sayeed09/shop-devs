import React from 'react';
import {
  Question as QuestionModel,
  Section,
} from '../../models/quiz/quiz-response';
interface Props {
  sections: Section[];
  currentQuestion: QuestionModel;
  progressPercentage: number;
}

const Sections = ({ sections, currentQuestion, progressPercentage }: Props) => {
  const selectedSectionIndx = sections.findIndex(
    (item) => item.id == currentQuestion.sectionId,
  );
  return (
    <>
      <div className="quiz-opt-section quiz-multi-select-small">
        {sections.map((item, index) => {
          return (
            <button
              key={item.id}
              className={
                currentQuestion.sectionId === item.id
                  ? 'selected'
                  : index < selectedSectionIndx
                    ? 'active'
                    : ' '
              }
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <div className="quiz-level-no">
        <div className="quiz-level-no-text">{progressPercentage}%</div>
        <ul>
          <li
            style={{ width: `${progressPercentage}%` }}
            className={'active'}
          ></li>
        </ul>
      </div>
    </>
  );
};

export default Sections;
