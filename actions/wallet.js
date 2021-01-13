import {
  WALLET_CREATE,
  WALLET_FAILURE,
  WALLET_SUCCESS,
} from '../constants/Actions';
import {ethers} from '../tools/ethers';

export function walletCreated(wallet) {
  return {
    type: wallet ? WALLET_SUCCESS : WALLET_FAILURE,
    data: wallet,
  };
}

export function createWallet() {
  return function (dispatch, getState) {
    dispatch({type: WALLET_CREATE});
    let wallet = ethers.Wallet.createRandom();
    console.log(wallet);
    return dispatch(
      walletCreated({
        mnemonic: wallet.mnemonic.phrase,
        address: wallet.address,
        privateKey: wallet.privateKey,
      }),
    );
  };
}
