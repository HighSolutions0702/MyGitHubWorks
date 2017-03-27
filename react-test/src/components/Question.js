import React, { Component } from 'react';

export default class Question extends Component {
  render() {
    return (
      <div className="question page-header">{this.props.text}</div>
    )
  }
}
