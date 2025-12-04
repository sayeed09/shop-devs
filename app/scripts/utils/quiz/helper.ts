import { ProductResponseModal } from '../../interface/product';
import { ErrorFieldModel, SaveUserRequestModel } from '../../models/quiz/quiz-request';
import { Question, Question as QuestionModel } from '../../models/quiz/quiz-response';
import { INCENTIVE_DISCOUNT } from '../cart/price-formatter';
import { Moengage } from '../tracking/gaTracking';
import { OptionTypes } from './provider';

const isValid = (pattern: string, input: string) => {
  try {
    const regEx = new RegExp(pattern);
    return regEx.test(input);
  } catch (e) {
    return true;
  }
};

export const getCompletedQuestionsPercent = (
  totalQuestions: number,
  answeredQuestion: number,
) => {
  return Math.round((answeredQuestion / totalQuestions) * 100);
};

export const userResponseValid = (
  userResponses: SaveUserRequestModel[],
  question: Question,
  questions: Question[]
) => {
  if (!userResponses || userResponses.length == 0) return [{
    questionId: question.id as number,
    error: true
  }];
  if (question.optionType.toLocaleUpperCase() == OptionTypes.Multi) {
    let response: ErrorFieldModel[] = [];
    const multiQuestions = questions.filter((item) => question.multiQuestions?.includes(Number(item.id)));
    multiQuestions.forEach((item) => {
      response.push(checkForValid(userResponses, item));
    })
    return response;
  } else {
    return [checkForValid(userResponses, question)];
  }
};
const checkForValid = (userResponses: SaveUserRequestModel[], question: Question) => {
  const userResponse = userResponses.find((item) => item.questionId == question?.id) as SaveUserRequestModel;
  if (userResponse && userResponse.responseType == OptionTypes.Text) {
    return {
      questionId: question.id as number,
      error: isValid(question?.pattern as string, userResponse.response[0].trim()) ? false : true
    }
  } else {
    return {
      questionId: question.id as number,
      error: userResponse?.response?.length > 0 ? false : true
    }
  }
}

export const getPricingDetails = (productList: ProductResponseModal[]) => {

  let totalMrp = 0, price = 0, incentiveDiscount = 0;
  productList.forEach((item) => {
    totalMrp = totalMrp + item.data.variants[0].compareAtPrice;
    price = price + item.data.variants[0].price
  });
  incentiveDiscount = Math.round(price * INCENTIVE_DISCOUNT);

  return {
    incentiveDiscount: incentiveDiscount,
    totalMrp: totalMrp,
    price: price
  }
}

export const triggerMoengageEvents = (userResponses: SaveUserRequestModel[], currentQuestion: QuestionModel | undefined, actionType: string, isError: boolean) => {
  let userSelectedAnswer, errorMessage = '';
  const getCurrentQuestionResponse = userResponses.find(response => response.questionId === currentQuestion?.id);

  if (currentQuestion && currentQuestion?.options && currentQuestion.optionType.toUpperCase() !== OptionTypes.Text) {
    userSelectedAnswer = currentQuestion?.options.filter(options => {
      if (getCurrentQuestionResponse && getCurrentQuestionResponse.response.includes(options.id.toString())) return options.label;
    }).map(response => response.label);
    if (isError) {
      errorMessage = 'Please make selection';
    }
  } else {
    userSelectedAnswer = getCurrentQuestionResponse && getCurrentQuestionResponse.response[0];
    errorMessage = 'Please enter a valid input';
  }

  const eventName = isError ? 'hair_test_textfield_error_msg' : `hair_test_question_no_${currentQuestion?.id}`;
  let eventAttributes;
  if (isError) {
    eventAttributes = {
      question: currentQuestion?.label,
      action: actionType,
      value: userSelectedAnswer,
      errorMassage: errorMessage,
    };
  } else {
    eventAttributes = {
      question: currentQuestion?.label,
      action: actionType,
      value: userSelectedAnswer,
    };
  }

  Moengage.track_event(eventName, eventAttributes);

}


export const isNumberField = (pattern: string) => {
  return isValid(pattern, "123")
};

const isResponseInValid = (question: Question, userResponses: SaveUserRequestModel[], questions: Question[]) => {
  const userResponse = userResponses.find((item) => item.questionId == question.id) as SaveUserRequestModel;
  return question.optionType.toLocaleUpperCase() == OptionTypes.Text ?
    !userResponse?.response || (userResponse.response.length > 0 && userResponse.response[0].trim() == "") ? true : false :
    userResponseValid(userResponses, question as QuestionModel, questions).find((item) => item.questionId == question.id)?.error as boolean
}

export const hideNextBtn = (question: Question, userResponses: SaveUserRequestModel[], questions: Question[]) => {
  if (question.optionType.toLocaleUpperCase() == OptionTypes.Multi) {
    let nonEmptyMultiResponses = userResponses.filter((response) => question.multiQuestions?.includes(Number(response.questionId)) && response.response.length > 0 && response.response[0].trim().length > 0);
    return nonEmptyMultiResponses.length == question.multiQuestions?.length ? false : true
  } else {
    return isResponseInValid(question, userResponses, questions);
  }

}