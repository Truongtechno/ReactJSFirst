import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const checkAuthTimout = (expirationTime) => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000)
    };
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBj7WmElxCFf_4t7qZTy5eG5GBh9faCpRE';
    if(!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBj7WmElxCFf_4t7qZTy5eG5GBh9faCpRE';
    }
    axios
      .post(
        url,
        authData
      )
      .then(res => {
        console.log('Success');
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimout(res.data.expiresIn));
      })
      .catch(err => {
        console.log('Error', err);
        dispatch(authFail());
      });
  };
};
