export interface QuizResponseModel {
  data: QuizModel;
}

export interface QuizModel {
  quiz: Quiz;
}

export interface Quiz {
  id: number;
  questions: Question[];
  sections: Section[];
  minPath: number;
}

export interface Question {
  id: number | string;
  label: string;
  optionType: string;
  sectionId: number;
  pattern?: string;
  options?: Option[];
  subText?: string;
  supportingText?: string;
  multiQuestions?: number[]
  errorText?: string;
}

export interface Option {
  id: number;
  label: string;
  image?: string;
  isExclusive?: boolean;
}

export interface Section {
  id: number;
  title: string;
}

export interface CreateCaseResponseModel {
  data: CreateCaseResponse;
}

export interface CreateCaseResponse {
  caseId: string;
}

export interface SaveUserResponseModel {
  data: SaveUserResponse;
}

export interface SaveUserResponse {
  nextQuestionId: number;
  totalQuestionAnswered: number;
  remainingQuestions: number;
}

export interface GetCaseResponseModel {
  data: GetCaseResonse;
}

export interface GetCaseResonse {
  case: Case;
}

export interface Case {
  nextQuestionId: number;
  responses: Response[];
  id: string;
  name: string;
  phone: string;
  quizId: number;
}

export interface Response {
  responseType: string;
  response: string[];
  questionId: number;
}
export interface GetQuizResultResponseModel {
  data: QuizResultResponse
}

export interface QuizResultResponse {
  user: User
  diagnosis: Diagnosis[];
  hairAnalysis: HairAnalysis
  productRecommendations: ProductRecomendation[];
  hairStageImages: string[];
}

export interface User {
  name: string
}
export interface Diagnosis {
  image: string
  diagnosisList: string[];
  label: string;
}

export interface HairAnalysis {
  score: number
  condition: string
  description: string
  welcomeNote: string
  beforeImage: string
  afterImage: string
}

export interface ProductRecomendation {
  productId: string
  variantId: string
}
