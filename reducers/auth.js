import {LOGIN, LOG_OUT} from '../constants/Actions';

export default function auth(
  state = {shouldLogin: false, loggedIn: false},
  action,
) {
  switch (action.type) {
    case LOGIN:
      return action.data.token
        ? {shouldLogin: true, loggedIn: true, ...action.data}
        : state;
    case LOG_OUT:
      return {...state, shouldLogin: false, loggedIn: false};
    default:
      return state;
  }
}
