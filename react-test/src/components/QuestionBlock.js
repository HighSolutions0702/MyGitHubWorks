import React, { Component } from 'react';
import Question from './Question';
import AnswerBlock from './AnswerBlock';

export default class QuestionBlock extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  
  render() {
    return (
      <div className="question-block">
          <Question text={this.props.question}/>
          <AnswerBlock answers={this.props.answers} points={this.props.points} onClick={this.handleClick}/>
      </div>
    )
  }
  
  handleClick(points) {
    this.props.onClick(points, this.props.question)
  }
}
