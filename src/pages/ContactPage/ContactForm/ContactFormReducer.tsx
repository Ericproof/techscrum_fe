/* eslint-disable @typescript-eslint/naming-convention */
export const initState = {
  fullName: 'zhou tian',
  company: 'hello',
  phone: '1234567890',
  email: 'noreply@techscrumapp.com',
  message: 'testing'
};

export const enum ReducerActionTypes {
  SetFullName,
  SetCompany,
  SetPhone,
  SetEmail,
  SetMsg,
  FormReset
}

type ReducerAction = {
  type: ReducerActionTypes;
  payload?: string;
};

export function reducer(state: typeof initState, action: ReducerAction) {
  switch (action.type) {
    case ReducerActionTypes.SetFullName:
      return { ...state, fullName: action.payload ?? '' };
    case ReducerActionTypes.SetCompany:
      return { ...state, company: action.payload ?? '' };
    case ReducerActionTypes.SetPhone:
      return { ...state, phone: action.payload ?? '' };
    case ReducerActionTypes.SetEmail:
      return { ...state, email: action.payload ?? '' };
    case ReducerActionTypes.SetMsg:
      return { ...state, message: action.payload ?? '' };
    case ReducerActionTypes.FormReset:
      return initState;
    default:
      return state;
  }
}
