import React, { Component } from 'react';
import QuestionBlock from './QuestionBlock';
import Header from './Header';

export default class PageBlock extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)  
    this.state = {
      score : []
    }
  }
  
  render() {
    const questions = this.props.content.questions
    const answers = this.props.content.answers
    const points = this.props.content.points
    return (  
      <div className="page-block animated fadeIn">
        <Header text={this.props.headerText}/>
        <div className="container card">
          <QuestionBlock question={questions[0]} answers={answers[0]} points={points[0]} onClick={this.handleClick}/>
          <QuestionBlock question={questions[1]} answers={answers[1]} points={points[1]} onClick={this.handleClick}/>
          <QuestionBlock question={questions[2]} answers={answers[2]} points={points[2]} onClick={this.handleClick}/>
        </div>
      </div>
    )
  }
  
  handleClick(points, question) {
    let score = this.state.score
    let save = true
    for (let i = 0; i < 3; i++) {
      if (question == this.props.content.questions[i])
        score[i] = points
      if (typeof score[i] === "undefined")
        save = false
    }
    this.setState({
      score : score
    })
    if (save)
      this.props.save(this.state.score)
  }
}
