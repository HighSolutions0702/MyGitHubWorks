'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({

  container: {
    
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#8533ff',
  },
  
  textinput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
        padding: 15,
            borderRadius: 8,

    backgroundColor: '#FFF',

  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#FFFFFF',
    fontSize: 16
  },
  primary_button: {
    height: 36,
    backgroundColor: '#00b33c',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  
  primary_button_text: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center'
  },
  image: {
    width: 100,
    height: 100
  }
});