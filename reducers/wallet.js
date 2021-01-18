import {WALLET_SUCCESS, WALLET_FAILURE} from '../constants/Actions';
import Wallet from '../constants/Wallet';

export default function wallet(state = Wallet, action) {
  switch (action.type) {
    case WALLET_SUCCESS:
      return action.data;
    case WALLET_FAILURE:
      return state;
    default:
      return state;
  }
}
