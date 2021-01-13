import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
} from '../constants/Actions';
import {getWithAuth, putWithAuth} from '../tools/util';
import * as RootNavigation from '../RootNavigation';

function receiveProfile(data) {
  console.log(data);

  return {
    type: !data.error ? PROFILE_SUCCESS : PROFILE_FAILURE,
    data,
  };
}

async function fetchProfileJson(token) {
  let result = await getWithAuth(`user`, token);
  if (result && !result.error) {
    return result;
  } else {
    return false;
  }
}

export function getProfile() {
  return function (dispatch, getState) {
    dispatch({type: PROFILE_REQUEST});
    let {token} = getState().auth;
    return fetchProfileJson(token).then((json) =>
      dispatch(receiveProfile(json)),
    );
  };
}

async function updateProfileJson(nickname, interests, favoritePlaces, token) {
  let params = {
    nickname: nickname,
    interests: interests,
    favoritePlaces: favoritePlaces,
  };
  let result = await putWithAuth(`user`, params, token);
  console.log(result);
  if (result && !result.error) {
    return result;
  } else {
    return false;
  }
}

export function updateProfile(nickname, interests, favoritePlaces) {
  return function (dispatch, getState) {
    dispatch({type: UPDATE_PROFILE_REQUEST});
    let {token} = getState().auth;
    return updateProfileJson(nickname, interests, favoritePlaces, token).then(
      (json) => {
        dispatch(getProfile());
        RootNavigation.navigate('ProfileComplete');
      },
    );
  };
}
