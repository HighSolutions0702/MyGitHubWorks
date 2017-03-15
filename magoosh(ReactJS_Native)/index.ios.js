/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import Button from 'react-native'


import {
  AppRegistry,
      Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Signup from './src/pages/signup';
import Account from './src/pages/account';
import Header from './src/components/header';
import styles from './src/styles/common_style.js';

class magoosh extends Component {    

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {

      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      if(user_data != null){
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState(component);
          }else{
            this.setState({component: Account});
          }
        });
      }else{
        this.setState(component);
      }
    });

  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="Magoosh Auth" loaded={this.state.loaded} />  
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

/*
class magoosh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password : ''
    };
  }
  _handlePress() {
    var _this= this;
alert('Your ', _this.state.login,_this.state.password);
      fetch('https://gre.magoosh.com/api/v2/flashcards/sets/13/login.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          "login" : _this.state.login,
          "password" : _this.state.password,
          "create" : true,
          "api_auth_token": 'aaabcc8s79a99accc000845823992eeef29ae0'
        })
      }).done(function(response) {
        // @TODO Next View
        alert('Your account was created!', response);
        this.props.navigator.push({
          component: HomePage
        });
      });
  }

  render() {
    var _this = this;
    return (
      <View style={styles.background}>
        <View style={styles.container}>
            <TextInput
              style={styles.auntificationFields}
              onChangeText={(inputText) => this.setState({login: inputText})}
              value={this.state.login}
              placeholder="Email Address"
            />
            <TextInput
              style={styles.auntificationFields}
              onChangeText={(inputText) => this.setState({password: inputText})}
              value={this.state.password}
              secureTextEntry={true}
              placeholder="Password"
            />
            <Button
              containerStyle={styles.buttonContainer}
              style={styles.button}
              onPress={() => this._handlePress()}>
                Login
            </Button>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#BA55D3",
    paddingTop: 200,
    alignItems: 'center'
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  auntificationFields: {
    backgroundColor: 'white',
    marginBottom:20,
    padding:10,
    height:45,
    overflow:'hidden',
    width:200,
    borderRadius:6,
    fontSize:20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'white'
  },
  button: {
    width:100,
    color: "#000000",
    fontSize:20
  }
});
*/
AppRegistry.registerComponent('magoosh', () => magoosh);
