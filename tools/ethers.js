// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {Web3HttpProvider, OpenGSN} from '@react-native-anywhere/anywhere';

import Wallet from '../constants/Wallet';

const {
  RelayProvider: {RelayProvider},
  GSNConfigurator,
} = OpenGSN;

const httpProvider = new Web3HttpProvider('https://rpc-mainnet.maticvigil.com');

async function getSigner() {
  const config = {
    paymasterAddress: '0xF1B18608F814CDA7Cac8d9270226019FeD7a5DCF',
    preferredRelays: ['0xAf9a5e08748a16A5c20A1452b5829FB59d592B05'],
    forwarderAddress: '0x6C34EE316E8b0431343B2659A9cD50EA22BbAF0F',
    // chainId: '137',
    // networkId: '137',
    // verbose: true,
    loggerConfiguration: {
      logLevel: 'debug',
      // loggerUrl: 'logger.opengsn.org',
    },
  };

  const conf = {
    ourContract: '0xe96202bBd148A7D512b29F32a251A02d592Fe94b',
    paymaster: '0xF1B18608F814CDA7Cac8d9270226019FeD7a5DCF',
    gasPrice: 20000000000, // 20 Gwei
    chainId: '137',
    networkId: '137',
    verbose: true,
    loggerConfiguration: {
      logLevel: 'debug',
      // loggerUrl: 'logger.opengsn.org',
    },
  };
  try {
    console.log(httpProvider);
    const gsnProvider = await RelayProvider.newProvider({
      provider: httpProvider,
      conf,
    }).init();
    // console.log('gsnprovider');
    // console.log(gsnProvider);

    const provider = new ethers.providers.Web3Provider(gsnProvider);

    return new ethers.Wallet(Wallet.privateKey).connect(provider);
  } catch (err) {
    console.log('error:');
    console.log(err);
  }
}

export {ethers, getSigner};