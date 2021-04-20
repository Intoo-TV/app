import {getExternal, getWithAuth, postWithAuth} from '../tools/util';
import {navigate} from '../RootNavigation';
import {
  EXPERIENCE_CREATE,
  EXPERIENCE_CREATE_SUCCESS,
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
  return postWithAuth(`experience`, params, token);
}

export function createExperience(params, templateIndex = -1) {
  return function (dispatch, getState) {
    dispatch({type: EXPERIENCE_CREATE});
    let {token} = getState().auth;
    return createExperienceJson(params, token).then(async (json) => {
      if (json && !json.error) {
        console.log(json);
        let url = json.url;
        // go to QR code screen
        dispatch({type: EXPERIENCE_CREATE_SUCCESS});
        navigate('ExpLive', {url});
        return;
      } else {
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
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
  return {
    type: !data.error
      ? RECEIVE_UPCOMING_EXPERIENCES_SUCCESS
      : RECEIVE_UPCOMING_EXPERIENCES_FAILURE,
    data,
  };
}

async function fetchUpcomingExperiencesJson(token) {
  let result = await getWithAuth(`user/experiences?past=false`, token);
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
    return fetchUpcomingExperiencesJson(token).then(async (json) => {
      let experiences = await collectExperienceDetails(json);
      dispatch(receiveUpcomingExperiences(experiences));
    });
  };
}

async function collectExperienceDetails(experienceData) {
  let experiences = [];
  if (experienceData.experiences) {
    for (let i = 0; i < experienceData.experiences.length; i++) {
      let experience = experienceData.experiences[i];
      // console.log(experience);
      let data = await getExperienceData(experience.url);
      // console.log(data);
      experiences.push({
        title: data.title,
        ...experience,
        ...data.properties,
      });
    }
  }
  return experiences;
}

function receivePastExperiences(data) {
  return {
    type: !data.error
      ? RECEIVE_PAST_EXPERIENCES_SUCCESS
      : RECEIVE_PAST_EXPERIENCES_FAILURE,
    data,
  };
}

async function fetchPastExperiencesJson(token) {
  let result = await getWithAuth(`user/experiences?past=true`, token);
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
    return fetchPastExperiencesJson(token).then(async (json) => {
      let experiences = await collectExperienceDetails(json);
      dispatch(receivePastExperiences(experiences));
    });
  };
}

async function getExperienceData(url) {
  let result = await getExternal(url);
  if (result && !result.error) {
    return result;
  } else {
    return false;
  }
}

async function fetchNewExperiencesJson(token) {
  let result = await getWithAuth(`experience`, token);
  if (result && !result.error) {
    return result;
  } else {
    return false;
  }
}

export function getNewExperiences() {
  return function (dispatch, getState) {
    dispatch({type: RECEIVE_PAST_EXPERIENCES_REQUEST});
    let {token} = getState().auth;
    return fetchNewExperiencesJson(token).then(async (json) => {
      let experiences = await collectExperienceDetails(json);
      dispatch(receivePastExperiences(experiences));
    });
  };
}
