import ticketFactory from './abis/TicketFactory.json';
import erc20 from './abis/IERC20.json';

const abis = {
  ticketFactory: ticketFactory.abi,
  xpToken: erc20.abi,
};

export default abis;
