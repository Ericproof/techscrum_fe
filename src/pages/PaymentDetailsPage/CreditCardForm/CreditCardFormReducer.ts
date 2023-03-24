/* eslint-disable @typescript-eslint/naming-convention */
const initData = {
  type: 'MasterCard',
  holder: 'Yue Hua',
  number: '5353291888041513',
  expiry: '08/23'
};

export const initState = initData;

export const enum ReducerActionTypes {
  SetType,
  SetHolder,
  SetNumber,
  SetExpiry,
  FormReset
}

type ReducerAction = {
  type: ReducerActionTypes;
  payload?: string;
};

export function reducer(state: typeof initState, action: ReducerAction) {
  switch (action.type) {
    case ReducerActionTypes.SetType:
      return { ...state, type: action.payload ?? '' };
    case ReducerActionTypes.SetHolder:
      return { ...state, company: action.payload ?? '' };
    case ReducerActionTypes.SetNumber:
      return { ...state, phone: action.payload ?? '' };
    case ReducerActionTypes.SetExpiry:
      return { ...state, email: action.payload ?? '' };
    case ReducerActionTypes.FormReset:
      return initState;
    default:
      return state;
  }
}
