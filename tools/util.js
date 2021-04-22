import {AsyncStorage} from 'react-native';

const API_ENDPOINT = 'https://api.intoo.tv/api/';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(ACCESS_TOKEN);
  return token;
};

export const setToken = (newToken) => {
  token = newToken;
  return AsyncStorage.setItem(ACCESS_TOKEN, newToken);
};

export async function get(action) {
  return fetch(API_ENDPOINT + action, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function getWithAuth(action, token) {
  return fetch(API_ENDPOINT + action, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function getExternal(action) {
  return fetch(action, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function post(action, params) {
  return fetch(API_ENDPOINT + action, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function postWithAuth(action, params, token) {
  console.log('params');
  console.log(params);
  return fetch(API_ENDPOINT + action, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function putWithAuth(action, params, token) {
  return fetch(API_ENDPOINT + action, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isValidPasswordStrength(password) {
  var minimalPasswordRegex = new RegExp(
    '^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$',
    'g',
  );
  return minimalPasswordRegex.test(password);
}

export function mapStateToProps(state) {
  return state;
}

export function leadingZero(number) {
  if (number > 10) {
    return number;
  } else {
    return '0' + number;
  }
}

export function formatDateTime(date) {
  const time = new Date(date);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();

  return `${year}/${leadingZero(month)}/${leadingZero(day)} ${leadingZero(
    hour,
  )}:${leadingZero(minute)}`;
}
