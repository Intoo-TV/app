import {LOG_OUT, RECEIVE_NEW_EXPERIENCES_SUCCESS} from '../constants/Actions';

export default function newExperiences(state = [], action) {
  switch (action.type) {
    case RECEIVE_NEW_EXPERIENCES_SUCCESS:
      return action.data ? action.data : state;
    case LOG_OUT:
      return [];
    default:
      return state;
  }
}
