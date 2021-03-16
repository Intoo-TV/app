// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {Web3HttpProvider} from '@react-native-anywhere/anywhere';
import {store} from '../store';
import {MATICVIGIL_KEY, BICONOMY_KEY} from '@env';
import {Biconomy} from '@biconomy/mexa';
const httpProvider = new Web3HttpProvider(
  `https://rpc-mumbai.maticvigil.com/v1/${MATICVIGIL_KEY}`,
);
const biconomy = new Biconomy(httpProvider, {
  apiKey: BICONOMY_KEY,
  debug: true,
});
let provider = new ethers.providers.Web3Provider(biconomy);

biconomy
  .onEvent(biconomy.READY, () => {
    // Initialize your dapp here like getting user accounts etc
    console.log('biconomy is ready!');
  })
  .onEvent(biconomy.ERROR, (error, message) => {
    console.log('Biconomy error');
    console.log(error, message);
    // Handle error while initializing mexa
  });

async function getSigner() {
  try {
    const {wallet} = store.getState();
    if (wallet.privateKey) {
      return await new ethers.Wallet(wallet.privateKey).connect(provider);
    } else {
      return null;
    }
  } catch (err) {
    console.log('error:');
    console.log(err);
  }
}

export {ethers, getSigner};
