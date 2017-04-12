import React,{PropTypes} from "react";
import axios from "axios";
import { checkHttpStatus, parseJSON, handleRedirect } from '../utils';
import { browserHistory } from 'react-router';
import { MYLIFE, ROOT_URL } from '../globals/constants';



var instance = axios.create({headers: {'Content-Type': 'application/vnd.api+json',"Accept":"application/vnd.api+json"}});


/*START MY LIFE SECTION*/

/*MY LIKES SECTION STARTS*/
export function mylikes_list_request(){
    return {
        type: MYLIFE.MYLIKES_REQUEST,
    }
}

export function mylikes_list_success(data){
    return {
        type: MYLIFE.MYLIKES_SUCCESS,
        payload: data
    }
}
//get my lieks
export  function fetchMyLikes(token,id){

     let url = `${ROOT_URL}/api/v1/client_likes?sort=-id`;  
     let config = {
        headers: {'Authorization': token}
    };
    return function(dispatch) {
        dispatch(mylikes_list_request()); 
        instance.get(url,config)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(function (response) {             
            try {
                dispatch(mylikes_list_success(response.data));
            } catch (e) {
                console.log('*****e>>>>',e)
                //call function to redirect app to login
                //dispatch(handleRedirect);                 
            }
        })
        .catch(function (error) {     
            //call function to redirect app to login    
            dispatch(handleRedirect);           
        });
    }
   
}

//fetch about me


//fetch about me


//add my like
export function mylikes_create_request(){
    return {
        type: MYLIFE.MYLIKES_CREATE_REQUEST
    }
}

export function mylikes_create_success(data){

    return {
        type: MYLIFE.MYLIKES_CREATE_SUCCESS,
        payload: data
    }
}

export function mylikes_create_failure(){
    return {
        type: MYLIFE.MYLIKES_CREATE_FAIL       

    }
}
//get my likes
export  function createMyLike(token,data){

     let url = `${ROOT_URL}/api/v1/client_likes`;  
     let config = {
        headers: {'Authorization': token}
    };
    return function(dispatch) {
        dispatch(mylikes_create_request());
        instance.post(url,data,config)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(function (response) {             
            try {
                dispatch(mylikes_create_success(response.data));
            } catch (e) {
                console.log('*****e>>>>',e)
                dispatch(mylikes_create_failure);
                //call function to redirect app to login
                //dispatch(handleRedirect);                 
            }
        })
        .catch(function (error) {     
            //call function to redirect app to login    
            dispatch(mylikes_create_failure);           
        });
    }
   
}


//update my like
export function mylikes_update_request(){
    return {
        type: MYLIFE.MYLIKES_UPDATE_REQUEST
    }
}

export function mylikes_update_success(data){
    return {
        type: MYLIFE.MYLIKES_UPDATE_SUCCESS,
        payload: data
    }
}
export function mylikes_update_failure(){
    return {
        type: MYLIFE.MYLIKES_UPDATE_FAIL       
    }
}
//get my likes
export  function updateMyLike(token,like){
    console.log('like',like);
     let url = `${ROOT_URL}/api/v1/client_likes/`+like.data.id;  
     let config = {
        headers: {'Authorization': token}
    };
    return function(dispatch) {
        dispatch(mylikes_update_request());
        instance.patch(url,like,config)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(function (response) {             
            try {
                dispatch(mylikes_update_success(response.data));
            } catch (e) {
                console.log('*****e>>>>',e)
                dispatch(mylikes_update_failure);
                //call function to redirect app to login
                //dispatch(handleRedirect);                 
            }
        })
        .catch(function (error) {     
            //call function to redirect app to login    
            dispatch(mylikes_update_failure);           
        });
    }
   
}
//delete

export  function deleteMyLike(token,like_id){
    
     let url = `${ROOT_URL}/api/v1/client_likes/`+like_id;  
     let config = {
        headers: {'Authorization': token}
    };
    return function(dispatch) {
        dispatch(mylikes_update_request());
        instance.delete(url,config)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(function (response) {             
            try {
                dispatch(mylikes_update_success(response.data));
            } catch (e) {
                console.log('*****e>>>>',e)
                dispatch(mylikes_update_failure);
                //call function to redirect app to login
                //dispatch(handleRedirect);                 
            }
        })
        .catch(function (error) {     
            //call function to redirect app to login    
            dispatch(mylikes_update_failure);           
        });
    }
   
}

/*MY LIKES SECTION ENDS*/

/*ABOUT ME SECTION*/
export function about_me_request(){
    return {
        type: MYLIFE.ABOUTME_REQUEST,
    }
}

export function about_me_success(data){
    return {
        type: MYLIFE.ABOUTME_SUCCESS,
        payload: data
    }
}
//fetch about me
export  function fetchAboutMe(token,id){

     let url = `${ROOT_URL}/api/v1/clients`;  
     let config = {
        headers: {'Authorization':token}
    };
    return function(dispatch) {
        dispatch(about_me_request()); 
        instance.get(url,config)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(function (response) {             
            try {
                dispatch(about_me_success(response.data));
            } catch (e) {
                console.log('*****e>>>>',e)
                //call function to redirect app to login
                //dispatch(handleRedirect);                 
            }
        })
        .catch(function (error) {     
            //call function to redirect app to login    
            dispatch(handleRedirect);           
        });
    }
   
}

//update about me
export function aboutme_update_request(){
    return {
        type: MYLIFE.ABOUTME_UPDATE_REQUEST
    }
}


export function aboutme_update_success(data){    
    return {
        type: MYLIFE.ABOUTME_UPDATE_SUCCESS,
        payload: data
    }
}
export function aboutme_update_failure(){    
    return {
        type: MYLIFE.ABOUTME_UPDATE_FAIL       
    }
}
//UPDATE ABOUT ME
export  function updateAboutMe(token,aboutme){
    console.log('aboutme',aboutme);
     let url = `${ROOT_URL}/api/v1/clients/`+aboutme.data.id;  
     let config = {
        headers: {'Authorization':token}
    };
    return function(dispatch) {
        dispatch(aboutme_update_request());
        instance.patch(url,aboutme,config)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(function (response) {             
            try {
                dispatch(aboutme_update_success(response.data));
            } catch (e) {
                console.log('*****e>>>>',e)
                dispatch(aboutme_update_failure());
                //call function to redirect app to login
                //dispatch(handleRedirect);                 
            }
        })
        .catch(function (error) {     
            //call function to redirect app to login  
            console.log('*****error>>>>',error)  
            dispatch(aboutme_update_failure());           
        });
    }
   
}


