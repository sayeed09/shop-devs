import {
  IConcernsResponse,
  IProductAdviceAction,
} from '../interface/product-advice';

export const setConcerns = (
  concerns: IConcernsResponse,
): IProductAdviceAction => ({
  type: 'SET_GOAL_CONCERS',
  payload: concerns,
});
