import {WALLET_SUCCESS, WALLET_FAILURE} from '../constants/Actions';

export default function wallet(state = {}, action) {
  switch (action.type) {
    case WALLET_SUCCESS:
      return action.data;
    case WALLET_FAILURE:
      return state;
    default:
      return state;
  }
}
