import {
  WALLET_CREATE,
  WALLET_FAILURE,
  WALLET_SUCCESS,
} from '../constants/Actions';
import {ethers} from '../contracts/index';

export function walletCreated(wallet) {
  return {
    type: wallet ? WALLET_SUCCESS : WALLET_FAILURE,
    data: wallet,
  };
}

// export function createWallet() {
//   return function () {
//     let wallet = ethers.Wallet.createRandom();
//     console.log(wallet);
//     return (
//       walletCreated({
//         mnemonic: wallet.mnemonic.phrase,
//         addresdispatchs: wallet.address,
//         privateKey: wallet.privateKey,
//       }),
//     );
//   };
// }
