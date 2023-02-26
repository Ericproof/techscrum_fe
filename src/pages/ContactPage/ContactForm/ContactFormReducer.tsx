/* eslint-disable @typescript-eslint/naming-convention */

// const testData = {
//   fullName: 'test user',
//   company: 'JR Academy',
//   phone: '0406199393',
//   email: 'userTest@example.com',
//   message: 'Hi, just want to thank all your brilliant developers!'
// };

const initData = {
  fullName: '',
  company: '',
  phone: '',
  email: '',
  message: ''
};

export const initState = initData;

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
