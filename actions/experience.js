import {postWithAuth} from '../tools/util';
import {createTicket} from '../contracts';
import * as RootNavigation from '../RootNavigation';

async function createExperienceJson(params, token) {
  return postWithAuth(`experience/`, params);
}

export function createExperience(params, templateIndex = -1) {
  return function (dispatch, getState) {
    let {token} = getState().auth;
    let {address} = getState().wallet;
    return createExperienceJson(params, token).then(async (json) => {
      if (json && !json.error) {
        console.log(json);
        let url = json.url;

        // create NFT
        let ticket = await createTicket(
          url,
          templateIndex,
          params.properties.isTemplate,
        );

        console.log('ticket');
        console.log(ticket);

        // go to QR code screen
        // if (ticket) {
        RootNavigation.navigate('ExpLive', {url});
        // }
        return;
      } else {
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
      }
    });
  };
}
