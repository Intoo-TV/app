import {
  LOG_OUT,
  RECEIVE_UPCOMING_EXPERIENCES_SUCCESS,
} from '../constants/Actions';

export default function upcomingExperiences(state = [], action) {
  switch (action.type) {
    case RECEIVE_UPCOMING_EXPERIENCES_SUCCESS:
      return action.data.experiences;
    case LOG_OUT:
      return [];
    default:
      return state;
  }
}
