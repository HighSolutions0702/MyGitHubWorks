import React, { Component } from 'react';
import PageBlock from '../components/PageBlock';

export default class Competent extends Component {  
  constructor(props){
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }
  
  render() {
    const questions = ["Чи можете ви побудувати модель вирішуваної задачі?",
                       "Чи вистачає вам ініціативи при вирішенні задач?",
                       "Чи можете вирішувати проблеми з якими ще не стикались?"]
                       
    const answers = []
    answers[0] = ["Так", "Не повністю", "В окремих випадках"]
    answers[1] = ["Так", "Зрідка", "Потрібне натхнення"]
    answers[2] = ["Так", "В окремих випадках", "Ні"]

    const points = []
    points[0] = [5, 3, 2]
    points[1] = [5, 3, 2]
    points[2] = [2, 3, 5]
    const content = {questions, answers, points}
    
    return(
      <PageBlock headerText="Компетентний" content={content} save={this.handleSave}/>
    )
  }
  
  handleSave(score) {
    this.props.route.onSave(score)
  }
}
