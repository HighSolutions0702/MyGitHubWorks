import React, { Component } from 'react';
import PageBlock from '../components/PageBlock';

export default class Beginner extends Component {  
  constructor(props){
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }
  
  render() {
    const questions = ["Чи використовуєте власний досвід при вирішенні задач?",
                       "Чи користуєтесь фіксованими правилами  для вирішення задач?",
                       "Чи відчуваєте ви загальний контекст вирішення задачі?"]
                       
    const answers = []
    answers[0] = ["Зрідка", "Частково", "Ні"]
    answers[1] = ["Так", "В окремих випадках", "Не потрібні"]
    answers[2] = ["Так", "Частково", "В окремих випадках"]

    const points = []
    points[0] = [5, 3, 2]
    points[1] = [2, 3, 5]
    points[2] = [2, 3, 5]
    const content = {questions, answers, points}
    
    return(
      <PageBlock headerText="Твердий Початківець" content={content} save={this.handleSave}/>
    )
  }
  
  handleSave(score) {
    this.props.route.onSave(score)
  }
}
