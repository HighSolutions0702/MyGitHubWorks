import React, { Component } from 'react';
import PageBlock from '../components/PageBlock';

export default class Proficient extends Component {  
  constructor(props){
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }
  
  render() {
    const questions = ["Чи  необхідний вам весь контекст задачі?",
                       "Чи переглядаєте ви свої наміри до вирішення задачі?",
                       "Чи здатні  ви  навчатись у інших?"]
                       
    const answers = []
    answers[0] = ["Так", "В окремих деталях", "В загальному"]
    answers[1] = ["Так", "Зрідка", "Коли є потреба"]
    answers[2] = ["Так", "Зрідка", "Коли є потреба"]

    const points = []
    points[0] = [5, 3, 2]
    points[1] = [5, 3, 2]
    points[2] = [5, 3, 2]
    const content = {questions, answers, points}
    
    return(
      <PageBlock headerText="Досвідчений" content={content} save={this.handleSave}/>
    )
  }
  
  handleSave(score) {
    this.props.route.onSave(score)
  }
}
