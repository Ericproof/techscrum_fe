/* eslint-disable @typescript-eslint/naming-convention */
export const initState = {
  enquiryType: '',
  fullName: '',
  company: '',
  phone: '',
  email: '',
  message: ''
};

export const enum ReducerActionTypes {
  SetEmail
}

type ReducerAction = {
  type: ReducerActionTypes;
  payload?: string;
};

export function reducer(state: typeof initState, action: ReducerAction) {
  switch (action.type) {
    case ReducerActionTypes.SetEmail:
      return { ...state, email: action.payload ?? '' };
    default:
      return state;
  }
}
