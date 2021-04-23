import {LOG_OUT, RECEIVE_PAST_EXPERIENCES_SUCCESS} from '../constants/Actions';

export default function pastExperiences(state = [], action) {
  switch (action.type) {
    case RECEIVE_PAST_EXPERIENCES_SUCCESS:
      return action.data ? action.data : state;
    case LOG_OUT:
      return [];
    default:
      return state;
  }
}
