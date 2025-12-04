import {
  CreateCaseRequestModel,
  SaveUserRequestPayload,
} from '../models/quiz/quiz-request';
import {
  CreateCaseResponseModel,
  GetCaseResponseModel,
  GetQuizResultResponseModel,
  QuizResponseModel,
  SaveUserResponseModel,
} from '../models/quiz/quiz-response';
import { axiosClient } from '../utils/axios-client';
import { baseEndpoints } from '../utils/endpoints';

const fetchQuiz = async (id: number) => {
  const { data } = await axiosClient
    .get<QuizResponseModel>(`${baseEndpoints.quiz}/${id}`)
    .then((response) => {
      return response;
    });
  return data;
};

const createCase = async (payload: CreateCaseRequestModel) => {
  const { data } = await axiosClient
    .post<CreateCaseResponseModel>(`${baseEndpoints.quiz}/case`, payload)
    .then((response) => {
      return response;
    });
  return data;
};

const saveUserResponse = async (
  payload: SaveUserRequestPayload,
  caseId: string,
) => {
  const { data } = await axiosClient
    .put<SaveUserResponseModel>(`${baseEndpoints.quiz}/case/${caseId}`, payload)
    .then((response) => {
      return response;
    });
  return data;
};

const fetchCase = async (caseId: string) => {
  const { data } = await axiosClient
    .get<GetCaseResponseModel>(`${baseEndpoints.quiz}/case/${caseId}`)
    .then((response) => {
      return response;
    });
  return data;
};

const fetchResult = async (caseId: string) => {
  const { data } = await axiosClient
    .get<GetQuizResultResponseModel>(`${baseEndpoints.quiz}/case/${caseId}/result`)
    .then((response) => {
      return response;
    });
  return data;
};

export const quizService = {
  fetchQuiz,
  createCase,
  saveUserResponse,
  fetchCase,
  fetchResult
};
