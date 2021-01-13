import {post, get} from '../tools/util';
import {LOGIN, LOG_OUT} from '../constants/Actions';
import {createWallet} from './wallet';
import {getProfile} from './profile';
import * as RootNavigation from '../RootNavigation';

function doLogOut() {
  return {
    type: LOG_OUT,
  };
}

async function fetchLoginJson(email, password) {
  let params = {
    email: email,
    password: password,
  };

  return post(`user/login`, params);
}

async function fetchSignupJson(email, password, address) {
  let params = {
    email: email,
    password: password,
    ethAddress: address,
  };

  return post(`user/`, params);
}

export function login(email, password, createProfile = false) {
  return function (dispatch, getState) {
    return fetchLoginJson(email, password).then((json) => {
      console.log(json);
      if (json && !json.error) {
        dispatch({type: LOGIN, data: json});
        dispatch(getProfile());
        if (createProfile) {
          RootNavigation.navigate('Success');
        } else {
          RootNavigation.navigate('Option');
        }
      } else {
        // dispatch(addAlert('error', '', json.error));
      }
    });
  };
}

export function signup(email, password) {
  return function (dispatch, getState) {
    // create random wallet
    dispatch(createWallet());

    let wallet = getState().wallet;

    return fetchSignupJson(email, password, wallet.address).then((json) => {
      console.log(json);
      if (json && !json.error) {
        //login and go to the success screen
        dispatch(login(email, password, true));
        return;
      } else {
        // dispatch(addAlert('error', '', json.error));
        console.log(json.error);
      }
    });
  };
}

export function logout() {
  return function (dispatch, getState) {
    return dispatch(doLogOut());
  };
}
