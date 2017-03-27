import React, { Component } from 'react';
import Answer from './Answer';

export default class AnswerBlock extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  
  render() {
    return (
      <div className="answer-block">
        <Answer text={this.props.answers[0]} points={this.props.points[0]} onClick={this.handleClick}/>
        <Answer text={this.props.answers[1]} points={this.props.points[1]} onClick={this.handleClick}/>
        <Answer text={this.props.answers[2]} points={this.props.points[2]} onClick={this.handleClick}/>
      </div>
    )
  }
  
  handleClick(points) {
    this.props.onClick(points)
  }
}
