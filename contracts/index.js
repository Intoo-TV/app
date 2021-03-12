import abis from './abis';
import addresses from './addresses';

import {ethers, getSigner} from '../tools/ethers';
import {AddTokenToExperience} from '../actions/experience';
import {store} from '../store/index';
import {navigate} from '../RootNavigation';

const TOO_MUCH = 42000000000;

// these are the contract instances that let us call
// all the functions on the smart contracts
// ! note: if the function changes the state of contract
// ! postfix the call with .send();
// ! else, .call();
export const ticketFactoryContract = async () => {
  try {
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
export const createTicket = async (
  props,
  templateIndex,
  saveTemplate,
  start,
  duration,
) => {
  try {
    const ticketFactoryInst = await ticketFactoryContract();

    ticketFactoryInst.once(
      'TicketCreated',
      async (ticketId, ticketCreator, props, templateIndex) => {
        console.log('Ticket created!');
        console.log(ticketId.toString());
        console.log(props);

        //ToDo: send ticket to backend
        console.log('Send token to backend');
        store.dispatch(
          AddTokenToExperience(ticketId.toNumber(), props, start, duration),
        );
      },
    );

    console.log('estimate gas');
    let estimateGas = await ticketFactoryInst.estimateGas.createTicket(
      props,
      templateIndex,
      saveTemplate,
    );

    console.log('gas estimate:' + estimateGas.toString() + ' GWEI');

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
    return false;
  }
};

// TODO: need events in the smart contract

/**
 * @param tokenId - when we have minted the ticket, our smart contract
 * incremented the counter of how many NFTs it minted
 * We need this tokenId here so that we know which ticket the host
 * is interested in
 * @param host - the address of the person interested in hosting the event
 */
export const createAccessToEvent = async (ticketId, props, host) => {
  try {
    const ticketFactoryInst = await ticketFactoryContract();

    ticketFactoryInst.once(
      'ExperienceMatchingCreated',
      async (
        ticketId,
        host,
        guest,
        hostExperienceAccessId,
        guestExperienceAccessId,
      ) => {
        console.log('Experience matched');
        console.log(ticketId);
        console.log(host);
        console.log(guest);
        console.log(hostExperienceAccessId);
        console.log(guestExperienceAccessId);

        //ToDo: update ticket to backend
        navigate('ExpLive', {url: props});
      },
    );

    let ticket = await ticketFactoryInst.createAccessToEvent(
      ticketId,
      props,
      host,
    );
    console.log('XP Ticket created');
    console.log(ticket);
    return ticket;
  } catch (err) {
    console.log('error');
    console.log(err);
    return false;
  }
};

export const expireExperience = async (ticketId) => {
  try {
    const ticketFactoryInst = await ticketFactoryContract();

    ticketFactoryInst.once('ExperienceEnded', (ticketId) => {
      console.log('Experience ended');
      console.log(ticketId);

      //ToDo: update backend
    });

    let ticket = await ticketFactoryInst.expireExperience(ticketId);
    console.log('Expired experience');
    console.log(ticket);
    return ticket;
  } catch (err) {
    console.log('error');
    console.log(err);
    return false;
  }
};

export const getExperiencesByAddress = async () => {
  const ticketFactoryInst = await ticketFactoryContract();
  try {
    // let filter = ticketFactoryInst.filters.TicketCreated(null);
    // let experiences = await ticketFactoryInst.queryFilter(filter, 0, 'latest');
    // console.log(experiences);
    let balance = await ticketFactoryInst.balanceOf(
      '0x1a3E496f93474ad09990aa1AB317ffD6405D832e',
    );
    console.log(balance);
    let owner = await ticketFactoryInst.tokenURI(22);
    console.log(owner);
  } catch (err) {
    console.log(err);
  }
};
