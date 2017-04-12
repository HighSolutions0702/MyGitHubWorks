import React,{PropTypes} from "react";
import axios from "axios";
import { checkHttpStatus, parseJSON } from '../utils';
import { browserHistory } from 'react-router';
import { confirm } from '../utils/confirm';
import Alert from 'react-s-alert';
import browser from "detect-browser";
var requestIp = require('request-ip');
//creating global instance for the axios to call apis

var instance = axios.create({headers: {'Content-Type': 'application/vnd.api+json',"Accept":"application/vnd.api+json"}});

import { AUTH, ROOT_URL } from '../globals/constants';
  
  //instance.defaults.headers.post[''] = 'application/vnd.api+json';

//logout and redirect the user to login page
export function logoutAndRedirect() {
    
    return (dispatch, state) => {
       confirm('Are you sure want to logout?').then(() => {
        dispatch(logout());
        browserHistory.push('/login')
         }, () => {
            //return;
        });
    }
    
}

//remove any login data saved
export function logout() {
    localStorage.removeItem('authToken');
    return {
        type: AUTH.LOGOUT_USER
    }
}

//handle state and redirection if user is successfully logged in 
export function loginUserSuccess(token) {
  localStorage.setItem('authToken', token);
  return {
    type: AUTH.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

//handle state in case of failure of user login
export function loginUserFailure(error) {
   Alert.error(error.response.statusText, {
                position: 'top-right'
            }); 
  return {
    type: AUTH.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
  

}

//handle state when request is send and resposen is awaited
export function loginUserRequest() {
  return {
    type: AUTH.LOGIN_USER_REQUEST
  }
}

// Login
export function loginUser(creds,redirect="/") {
    let url = `${ROOT_URL}/api/v1/auth`;
    //getting unix timestamp from moment    
   
    let day = moment().format("YYYY/MM/DD hh:mmA");
    let context_str = navigator.userAgent+" "+day;
    console.log("context_str",context_str)
    let loginArr = {
      data: {
        "login": creds.email,
        "password": creds.password,
        "context": context_str
      }
    }
    return function(dispatch) {
      dispatch(loginUserRequest());
      instance.post(url, loginArr)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(function (response) {
        try {
         
          dispatch(loginUserSuccess(response.data.attributes.key));
          browserHistory.push('/')
        } catch (e) {    
        console.log("I am here in e",e);    
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid username or password. Please try again.'
            }
          }));
        }
      })
      .catch(function (error) {    
      console.log("error error e",error);       
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid username or password. Please try again.'
            }
          }));
      });
    }
}

