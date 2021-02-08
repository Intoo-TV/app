import {getWithAuth, postWithAuth} from '../tools/util';
import {createTicket} from '../contracts';
import * as RootNavigation from '../RootNavigation';
import {
  EXPERIENCE_CREATE,
  EXPERIENCE_CREATE_SUCCESS,
  EXPERIENCE_CREATE_FAILURE,
  EXPERIENCE_TOKEN_ADD,
  EXPERIENCE_TOKEN_ADD_FAILURE,
  EXPERIENCE_TOKEN_ADD_SUCCESS,
  EXPERIENCE_TOKEN_EXPIRE,
  EXPERIENCE_TOKEN_EXPIRE_SUCCESS,
  EXPERIENCE_TOKEN_EXPIRE_FAILURE,
  RECEIVE_UPCOMING_EXPERIENCES_SUCCESS,
  RECEIVE_UPCOMING_EXPERIENCES_FAILURE,
  RECEIVE_UPCOMING_EXPERIENCES_REQUEST,
  RECEIVE_PAST_EXPERIENCES_SUCCESS,
  RECEIVE_PAST_EXPERIENCES_FAILURE,
  RECEIVE_PAST_EXPERIENCES_REQUEST,
} from '../constants/Actions';

async function createExperienceJson(params, token) {
  return postWithAuth(`experience/`, params);
}

export function createExperience(params, templateIndex = -1) {
  return function (dispatch, getState) {
    dispatch({type: EXPERIENCE_CREATE});
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
          dispatch({type: EXPERIENCE_CREATE_SUCCESS});
          RootNavigation.navigate('ExpLive', {url});
        } else {
          //ToDo: show error
          dispatch({type: EXPERIENCE_CREATE_FAILURE});
        }
        return;
      } else {
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
      }
    });
  };
}

async function addTokenToExperienceJson(tokenId, url, token) {
  let params = {tokenId, url};
  return postWithAuth(`experience/token/`, params, token);
}

export function AddTokenToExperience(tokenId, url) {
  return function (dispatch, getState) {
    dispatch({type: EXPERIENCE_TOKEN_ADD});
    let {token} = getState().auth;
    return addTokenToExperienceJson(tokenId, url, token).then((json) => {
      if (json && !json.error) {
        dispatch({type: EXPERIENCE_TOKEN_ADD_SUCCESS});
        return true;
      } else {
        dispatch({type: EXPERIENCE_TOKEN_ADD_FAILURE});
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
        return false;
      }
    });
  };
}

async function expireTokenJson(tokenId, token) {
  let params = {tokenId};
  return postWithAuth(`experience/complete/`, params, token);
}

export function expireToken(tokenId) {
  return function (dispatch, getState) {
    dispatch({type: EXPERIENCE_TOKEN_EXPIRE});
    let {token} = getState().auth;
    return expireTokenJson(tokenId, token).then((json) => {
      if (json && !json.error) {
        dispatch({type: EXPERIENCE_TOKEN_EXPIRE_SUCCESS});
        return true;
      } else {
        dispatch({type: EXPERIENCE_TOKEN_EXPIRE_FAILURE});
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
        return false;
      }
    });
  };
}

function receiveUpcomingExperiences(data) {
  console.log(data);

  return {
    type: !data.error
      ? RECEIVE_UPCOMING_EXPERIENCES_SUCCESS
      : RECEIVE_UPCOMING_EXPERIENCES_FAILURE,
    data,
  };
}

async function fetchUpcomingExperiencesJson(token) {
  let result = await getWithAuth(`experience?future=true`, token);
  if (result && !result.error) {
    return result;
  } else {
    return false;
  }
}

export function getUpcomingExperiences() {
  return function (dispatch, getState) {
    dispatch({type: RECEIVE_UPCOMING_EXPERIENCES_REQUEST});
    let {token} = getState().auth;
    return fetchUpcomingExperiencesJson(token).then((json) =>
      dispatch(receiveUpcomingExperiences(json)),
    );
  };
}

function receivePastExperiences(data) {
  console.log(data);

  return {
    type: !data.error
      ? RECEIVE_PAST_EXPERIENCES_SUCCESS
      : RECEIVE_PAST_EXPERIENCES_FAILURE,
    data,
  };
}

async function fetchPastExperiencesJson(token) {
  let result = await getWithAuth(`experience?future=false`, token);
  if (result && !result.error) {
    return result;
  } else {
    return false;
  }
}

export function getPastExperiences() {
  return function (dispatch, getState) {
    dispatch({type: RECEIVE_PAST_EXPERIENCES_REQUEST});
    let {token} = getState().auth;
    return fetchPastExperiencesJson(token).then((json) =>
      dispatch(receivePastExperiences(json)),
    );
  };
}
