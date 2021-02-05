import {postWithAuth} from '../tools/util';
import {createTicket} from '../contracts';
import * as RootNavigation from '../RootNavigation';

async function createExperienceJson(params, token) {
  return postWithAuth(`experience/`, params);
}

export function createExperience(params, templateIndex = -1) {
  return function (dispatch, getState) {
    let {token} = getState().auth;
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

        if (ticket) {
          // go to QR code screen
          RootNavigation.navigate('ExpLive', {url});
        } else {
          //ToDo: show error
        }
        return;
      } else {
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
      }
    });
  };
}
