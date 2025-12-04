import React, { useEffect, useState } from 'react';
import '../../../scripts/scss/import/_quiz.scss';
import Header from '../../components/quiz/header';
import Sections from '../../components/quiz/sections';
import Footer from '../../components/quiz/footer';
import { quizService } from '../../services/quiz';
import {
  Question as QuestionModel,
  Quiz,
  Section,
} from '../../models/quiz/quiz-response';
import Question from '../../components/quiz/question';
import {
  CreateCaseRequestModel,
  ErrorFieldModel,
  SaveUserRequestModel,
  SaveUserRequestPayload,
} from '../../models/quiz/quiz-request';
import {
  HAIR_QUIZ_PARTIAL_KEY,
  HAIR_QUIZ_RESULT_KEY,
  OptionTypes,
  PersonalQuestion,
  ResultPageUrl,
  personalQuestions,
} from '../../utils/quiz/provider';
import Loader from '../cart/loader';
import {
  getCompletedQuestionsPercent,
  hideNextBtn,
  triggerMoengageEvents,
  userResponseValid,
} from '../../utils/quiz/helper';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helper';
import { Moengage } from '../../utils/tracking/gaTracking';

const Quiz = () => {
  const [quiz, setQuiz] = useState<Quiz>();
  const [currentQuestion, setCurrentQuestion] = useState<QuestionModel>();
  const [userResponses, setUserResponses] = useState<SaveUserRequestModel[]>(
    [],
  );
  const [caseId, setCaseId] = useState<string>();
  const [questionRunner, setQuestionRunner] = useState<number>(0);
  const [minQuestionsToAnswer, setMinQuestionsToAnswer] = useState<number>(0); //used for progress bar
  const [inputFieldErr, setInputFieldErr] = useState<ErrorFieldModel[]>([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [multiQuestions, setMultiQuestions] = useState<QuestionModel[]>([]);
  const [prevQuestions, setPrevQuestions] = useState<(string | number)[]>([]);
  const [showContinueTest, setShowContinueTest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Moengage.track_event('hair_test_initiated', {});
    getQuiz(1); //id=1 for hair quiz later on to be picked by query param etc
  }, []);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      fetchCase();
    }
  }, [quiz])

  useEffect(() => {
    let totalQuestions = minQuestionsToAnswer + questionRunner;

    const completedPercentage = getCompletedQuestionsPercent(
      totalQuestions,
      questionRunner,
    );
    setProgressPercentage(completedPercentage || 0);
  }, [minQuestionsToAnswer, showContinueTest]);

  useEffect(() => {
    if (currentQuestion && currentQuestion.optionType.toLocaleUpperCase() == OptionTypes.Radio) {
      setTimeout(() => {
        handleNextQuestion();
      }, 200);
    }
  }, [userResponses])

  useEffect(() => {
    if (currentQuestion && currentQuestion.optionType.toLocaleUpperCase() == OptionTypes.Multi) {
      let currentMultiQuestions: QuestionModel[] = [];
      currentQuestion.multiQuestions?.forEach((item) => currentMultiQuestions.push(quiz?.questions.find((question) => item == question.id) as QuestionModel))
      setMultiQuestions(currentMultiQuestions)
    }
  }, [currentQuestion])


  const fetchCase = async () => {
    const partialCaseId = getFromLocalStorage(HAIR_QUIZ_PARTIAL_KEY);
    if (partialCaseId) {
      setCaseId(String(partialCaseId));
      const partialCaseResponseModel = await quizService.fetchCase(partialCaseId);
      if (partialCaseResponseModel.data.case?.nextQuestionId != 0) {
        const phoneRequestModel: SaveUserRequestModel = {
          questionId: PersonalQuestion.Phone,
          responseType: OptionTypes.Text.toLocaleUpperCase(),
          response: [partialCaseResponseModel.data.case.phone]
        }
        let responseList: SaveUserRequestModel[] = [];
        if (partialCaseResponseModel.data.case.responses) {
          setQuestionRunner(partialCaseResponseModel.data.case.responses.length + 1);
          responseList = [phoneRequestModel, ...partialCaseResponseModel.data.case.responses];
          setUserResponses(responseList);
          let getCurrentQuestion = quiz?.questions.find((item) => item.id == partialCaseResponseModel.data.case.nextQuestionId) as QuestionModel;
          setCurrentQuestion(getCurrentQuestion)
          let question = quiz?.questions.find((item) => item.id == responseList[responseList.length - 1].questionId) as QuestionModel;
          let userResponsesList = [responseList[responseList.length - 1]];
          if (question?.optionType.toLocaleUpperCase() == OptionTypes.Multi) {
            userResponsesList = responseList.filter(
              (item) => question.multiQuestions?.includes(Number(item.questionId)),
            ) as SaveUserRequestModel[];
          }
          saveUserResponseAction(userResponsesList, question, partialCaseId);
        } else {
          setQuestionRunner(1);
          responseList = [phoneRequestModel];
          setUserResponses([phoneRequestModel]);
          let getCurrentQuestion = quiz?.questions[1];
          setCurrentQuestion(getCurrentQuestion);
          setMinQuestionsToAnswer(Number(quiz?.minPath) + 1)
        }
        let responseListSet = new Set<number | string>();
        responseList.forEach((item) => {
          let isMultiQuestion = quiz?.questions.find((value) => value.multiQuestions?.includes(Number(item.questionId)));
          if (isMultiQuestion) {
            responseListSet.add(isMultiQuestion.id)
          } else {
            responseListSet.add((item.questionId))
          }
        })
        setPrevQuestions(Array.from(responseListSet))

        setShowContinueTest(true);
      }
    }
    setIsLoading(false);
  }

  const getQuiz = async (id: number) => {
    const quiz = await quizService.fetchQuiz(id);
    const allQuestions = [...personalQuestions, ...quiz.data.quiz.questions];
    setQuiz({
      ...quiz.data.quiz,
      questions: allQuestions,
    });

    setCurrentQuestion(allQuestions[0]);
    setMinQuestionsToAnswer(quiz.data.quiz.minPath + personalQuestions.length);
  };

  const createCase = async (phone: string) => {
    // create case after we collect phone from user
    let caseRequestData: CreateCaseRequestModel = {
      phone: phone.trim(),
      quizId: quiz?.id as number,
    };
    const createCase = await quizService.createCase(caseRequestData);
    setCaseId(createCase.data.caseId);
    setToLocalStorage(HAIR_QUIZ_PARTIAL_KEY, createCase.data.caseId);
    return createCase.data.caseId;
  };

  const handleNextQuestion = async () => {
    const inputFieldErr = userResponseValid(userResponses, currentQuestion as QuestionModel, quiz?.questions as QuestionModel[])
    if (inputFieldErr.filter((item) => item.error).length > 0) {
      triggerMoengageEvents(userResponses, currentQuestion, "next", true);
      setInputFieldErr(inputFieldErr);
      return;
    }
    triggerMoengageEvents(userResponses, currentQuestion, "next", false);
    handleClearError(currentQuestion?.id as number);
    setQuestionRunner((questionRunner) => questionRunner + 1);

    // create case
    if (currentQuestion?.id == PersonalQuestion.Phone) {
      setMinQuestionsToAnswer(
        (minQuestionsToAnswer) => minQuestionsToAnswer - 1,
      );
      const userPhoneResponse = userResponses.find(
        (item) => item.questionId == PersonalQuestion.Phone,
      ) as SaveUserRequestModel;
      await createCase(
        userPhoneResponse.response[0],
      );
      Moengage.track_event('hair_test_start_time', { time: new Date() });
      setCurrentQuestion(quiz?.questions[personalQuestions.length]);
      setPrevQuestions(prevQuestions => [...prevQuestions, currentQuestion?.id])
      return;
    }
    let userResponsesList = userResponses.filter(
      (item) => item.questionId == currentQuestion?.id,
    ) as SaveUserRequestModel[];
    if (currentQuestion?.optionType.toLocaleUpperCase() == OptionTypes.Multi) {
      userResponsesList = userResponses.filter(
        (item) => currentQuestion.multiQuestions?.includes(Number(item.questionId)),
      ) as SaveUserRequestModel[];
    }
    saveUserResponse(userResponsesList, currentQuestion as QuestionModel, caseId as string);
  };

  const handlePrevQuestion = () => {
    triggerMoengageEvents(userResponses, currentQuestion, "back", false);
    if (questionRunner === 0) return;

    const prevQuestion = quiz?.questions.find(
      (item) => item.id == prevQuestions[prevQuestions.length - 1],
    );
    setPrevQuestions(prevQuestions => [...prevQuestions.slice(0, prevQuestions.length - 1)])
    setCurrentQuestion(prevQuestion);
    setQuestionRunner((questionRunner) => questionRunner - 1);
    setMinQuestionsToAnswer((minQuestionsToAnswer) => minQuestionsToAnswer + 1);
  };

  const saveUserResponseAction = async (userResponses: SaveUserRequestModel[], question: QuestionModel, caseId: string) => {
    const payload: SaveUserRequestPayload = {
      responses: userResponses,
      multi: question?.optionType.toLocaleUpperCase() == OptionTypes.Multi ? { questionId: Number(question.id) } : undefined
    }
    const { data } = await quizService.saveUserResponse(
      payload,
      caseId as string,
    );
    if (data) {
      setMinQuestionsToAnswer(
        data?.remainingQuestions ? data.remainingQuestions : 0,
      );
    }
    return data;
  }

  const saveUserResponse = async (userResponses: SaveUserRequestModel[], question: QuestionModel, caseId: string) => {
    const data = await saveUserResponseAction(userResponses, question, caseId);
    if (data) {
      //fetch results on ternary question submit
      if (!data.nextQuestionId) {
        Moengage.track_event('hair_test_end_time', { time: new Date() });
        setToLocalStorage(HAIR_QUIZ_RESULT_KEY, caseId);
        window.location.href = `${ResultPageUrl}?caseId=${caseId}&ref=submit`;
      } else {
        const nextQuestion = quiz?.questions.filter(
          (item) => item.id == data.nextQuestionId,
        );
        if (nextQuestion && nextQuestion?.length > 0) {
          setCurrentQuestion(nextQuestion[0]);
          setPrevQuestions(prevQuestions => [...prevQuestions, Number(currentQuestion?.id)])
          if (nextQuestion[0].optionType.toLocaleUpperCase() == OptionTypes.Multi) {
            let currentMultiQuestions: QuestionModel[] = [];
            nextQuestion[0].multiQuestions?.forEach((item) => currentMultiQuestions.push(quiz?.questions.find((question) => item == question.id) as QuestionModel))
            setMultiQuestions(currentMultiQuestions)
          }
        }
      }
    }
  };
  const handleOnClickFromContinue = () => {
    setShowContinueTest(false);
    let eventAttributes = {
      phone: userResponses.find((item) => item.questionId == PersonalQuestion.Phone)?.response[0],
      caseId: caseId
    }
    Moengage.track_event("hair_test_continue_btn", eventAttributes);
  }
  const handleOnClickFromStart = () => {
    setMinQuestionsToAnswer(Number(quiz?.minPath) + personalQuestions.length);
    setQuestionRunner(0);
    setPrevQuestions([]);
    setUserResponses([]);
    setCurrentQuestion(quiz?.questions[0]);
    setShowContinueTest(false);
    let eventAttributes = {
      phone: userResponses.find((item) => item.questionId == PersonalQuestion.Phone)?.response[0],
      caseId: caseId
    }
    Moengage.track_event("hair_test_start_from_beginning_btn", eventAttributes);
  }
  const handleClearError = (questionId: number) => {
    setInputFieldErr([...inputFieldErr.filter((item) => item.questionId != questionId), { questionId: questionId, error: false }])
  }
  if (!currentQuestion || isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Header />

      {showContinueTest ? <>
        <div className="quiz-page-main">
          <div className="quiz-page-content-sec continue-test-sec">
            <div className='quiz-page-content-question'>
              <div className={"mb-64 mt-16 mt-m-0"}>
                <h2>Hey there, </h2>
                <p className="sub-heading mb-m-0"> Complete the test to get right diagnosis.
                </p>
                <div className='btn-sections'>
                  <button onClick={handleOnClickFromContinue} className='btn btn-primary'>Continue where you left</button>
                  <button onClick={handleOnClickFromStart} className='btn btn-outline-primary'>Start from the beginning</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </> :
        <div className="quiz-page-main">
          <div className="quiz-page-content-sec">
            <Sections
              sections={quiz?.sections as Section[]}
              currentQuestion={currentQuestion}
              progressPercentage={progressPercentage}
            />
            <div className='quiz-page-content-question'>
              <Question
                question={currentQuestion}
                userResponses={userResponses}
                setUserResponses={setUserResponses}
                inputFieldErr={inputFieldErr.find((field) =>
                  field.questionId == currentQuestion.id
                  || field.questionId.toString() == PersonalQuestion.Phone)?.error as boolean}
                setInputFieldErr={() => handleClearError(Number(currentQuestion.id))}
              />
              {currentQuestion.optionType.toLocaleUpperCase() == OptionTypes.Multi &&
                <div style={minQuestionsToAnswer <= 1 ? { display: 'flex', flexFlow: 'wrap', columnGap: 16 } : {}}>
                  {multiQuestions.map((item, index) => {
                    return <>
                      {index == multiQuestions.length - 1 && minQuestionsToAnswer <= 1 && <div style={{ flexBasis: '100%' }}></div>}
                      <Question
                        key={item.id}
                        question={item}
                        userResponses={userResponses}
                        setUserResponses={setUserResponses}
                        inputFieldErr={inputFieldErr.find((field) => field.questionId == item.id)?.error as boolean}
                        setInputFieldErr={() => handleClearError(Number(item.id))}
                        isMulti={currentQuestion.optionType.toLocaleUpperCase() == OptionTypes.Multi}
                      />
                    </>
                  }
                  )}
                </div>}
            </div>
          </div>
          <Footer
            handleNext={handleNextQuestion}
            handlePrev={handlePrevQuestion}
            hidePrev={currentQuestion.id == PersonalQuestion.Phone}
            hideNext={currentQuestion.optionType.toLocaleUpperCase() == OptionTypes.Radio}
            disableNext={hideNextBtn(currentQuestion, userResponses, quiz?.questions as QuestionModel[])}
            showSubmit={minQuestionsToAnswer <= 1 ? true : false}
          />
        </div>}
    </>
  );
};

export default Quiz;
