import React, { Component } from 'react';

export default class Answer extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  
  render() {
    return (
      <button className="answer btn btn-default" onClick={this.handleClick}>{this.props.text}
      </button>
    )
  }
  
  handleClick(e) {
    e.target.className += " active"
    this.props.onClick(this.props.points)
  }
}
