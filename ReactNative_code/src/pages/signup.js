'use strict';

import React, { Component } from 'react';


import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Navigator
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common_style.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });
if (!this.validateEmail(this.state.email)) {
    // not a valid email
            alert('Invalid email');
            return;
  } 
if (!this.validatePass(this.state.pass)) {
    // not a valid email
            alert('Invalid pass,one number, one lowercase and one uppercase letter at least six characters');
            return;
  } 
  {
    fetch('https://gre.magoosh.com/api/v2/flashcards/sets/13/login.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          "login" : this.state.email,
          "password" : this.state.password,
          "create" : true,
          "api_auth_token": 'aaabcc8s79a99accc000845823992eeef29ae0'
        })
      }).done(function(response) {
        // @TODO Next View
        
        alert('Your account was created!', response);
        // this.props.navigator.push({
        //   component: Account
        // });
      });

  }
}
validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
validatePass = (pass) => {
  // at least one number, one lowercase and one uppercase letter
    // at least six characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(pass);
};
  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>

            <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
            placeholder={"Email Address"}
            />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Already have account? Sign in"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);