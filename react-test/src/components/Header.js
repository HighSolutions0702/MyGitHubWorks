import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="App-header card">
        <div className="centered">
          <h1 className="text-shadow">
            {this.props.text}
          </h1>
        </div>
      </div>
    )
  }
}
