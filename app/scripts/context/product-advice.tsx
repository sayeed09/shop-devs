import React, { useReducer } from 'react';
import { IProductAdviceContextModel } from '../interface/product-advice';

export interface Itest {
  concerns: string[];
}

const defaultState: Itest = {
  concerns: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_GOAL_CONCERS':
      return {
        ...state,
        concerns: action.payload,
      };

    default:
      return state;
  }
};

export const ProductAdviceContext = React.createContext(
  {} as IProductAdviceContextModel,
);

export const Provider= ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <ProductAdviceContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductAdviceContext.Provider>
  );
};
