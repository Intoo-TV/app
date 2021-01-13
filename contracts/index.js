import abis from './abis';
import addresses from './addresses';

import {ethers, getSigner} from '../tools/ethers';

const TOO_MUCH = 42000000000;

// these are the contract instances that let us call
// all the functions on the smart contracts
// ! note: if the function changes the state of contract
// ! postfix the call with .send();
// ! else, .call();
export const ticketFactoryContract = async () => {
  try {
    console.log('get signer');
    const signer = await getSigner();
    let contract = await new ethers.Contract(
      addresses.ticketFactory,
      abis.ticketFactory,
      signer,
    );
    return contract;
  } catch (err) {
    console.log(err);
  }
};

export const xpContract = async () => {
  try {
    const signer = await getSigner();
    let contract = new ethers.Contract(addresses.xpToken, abis.xpToken, signer);
    return contract;
  } catch (err) {
    console.log(err);
  }
};

// TODO: rimble like notification at every step. this is a lengthy call
// -- consider creating a single smart contract function for all of the below
// todo: we need to call approve on the addresses.xpToken
// for every user. Otherwise, the transactions will fail
export const createTicket = async (props, templateIndex, saveTemplate) => {
  try {
    const ticketFactoryInst = await ticketFactoryContract();

    console.log(ticketFactoryInst);

    ticketFactoryInst.on(
      'TicketCreated',
      (ticketId, ticketCreator, props, templateIndex) => {
        console.log('Ticket created!');
        console.log(ticketId);
        console.log(props);
      },
    );

    console.log('estimate gas');
    let estimateGas = await ticketFactoryInst.estimateGas.createTicket(
      props,
      templateIndex,
      saveTemplate,
    );

    console.log(ethers.utils.formatEther(estimateGas));

    let ticket = await ticketFactoryInst.createTicket(
      props,
      templateIndex,
      saveTemplate,
    );
    console.log('contracts ticket');
    console.log(ticket);
    return ticket;
  } catch (err) {
    console.log('error');
    console.log(err);
    return;
  }
};
// ^ this over here uses ChainLink and generates the QR Code
// it is the most important bit for this hackathon

// TODO: need events in the smart contract

/**
 * @param tokenId - when we have minted the ticket, our smart contract
 * incremented the counter of how many NFTs it minted
 * We need this tokenId here so that we know which ticket the host
 * is interested in
 * @param host - the address of the person interested in hosting the event
 */
export const createAccessToEvent = async (
  web3,
  tokenId,
  host,
  accountSendingFrom,
) => {
  // can only be invoked after createTicket
  // ^ you need to pass an id when you do this
  // and if that id does not exist, you won't be
  // able to create. we can get ddosed with this
  // so need another check in the contract
  // but it is reentrancy guarded
  // I don't know I have slept very little in the past
  // three days. I am not thinking straight now

  // Sam, you can use the template above to implement this
  // you won't need everything, though

  const xpInst = xpContract(web3);
  const ticketFactoryInst = ticketFactoryContract(web3);

  // TODO: that Math.random() is BAD. we will change it later
  // 1. to create a ticket, a GUEST clicks create (after filling  in
  // the details on the app). Params such as date, duration, etc. are passed
  // down into this function
  // --- we need to ensure that the user has approved our contract
  // for their XP spending
  const approveReceipt = await xpContract.methods
    .approve(addresses.ticketFactory, String(TOO_MUCH * 1e18))
    .send({from: accountSendingFrom});

  // 2. call createAccessToEvent()
  const accessNfts = await xpContract.methods
    .createAccessToEvent(
      tokenId,
      'ipfs://we-have-stored-other-meta-here.json',
      host,
    )
    .send({from: accountSendingFrom});
};
