export interface CreateCaseRequestModel {
  phone: string;
  quizId: number;
}

export interface SaveUserRequestModel {
  questionId: number | string;
  responseType: string;
  response: string[];
}

export interface SaveUserRequestPayload {
  responses: SaveUserRequestModel[];
  multi?: MultQuestionModel;
}
export interface MultQuestionModel {
  questionId: number;
}

export interface ErrorFieldModel {
  questionId: number;
  error: boolean;
}