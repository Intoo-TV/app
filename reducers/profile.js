import {PROFILE_SUCCESS, LOG_OUT} from '../constants/Actions';

export default function profile(state = {}, action) {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return {...action.data};
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}
