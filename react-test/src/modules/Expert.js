import React, { Component } from 'react';
import PageBlock from '../components/PageBlock';

export default class Expert extends Component {  
  constructor(props){
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }
  
  render() {
    const questions = ["Чи обираєте ви нові методи своєї роботи?",
                       "Чи допомагає власна інтуїція при вирішенні задач?",
                       "Чи застовуєте рішення задач за аналогією?"]
                       
    const answers = []
    answers[0] = ["Так", "Вибірково", "Вистачає досвіду"]
    answers[1] = ["Так", "Частково", "При емоційному напруженні"]
    answers[2] = ["Часто", "Зрідка", "Тільки власний варіант"]

    const points = []
    points[0] = [5, 3, 2]
    points[1] = [5, 3, 2]
    points[2] = [5, 3, 2]
    const content = {questions, answers, points}
    
    return(
      <PageBlock headerText="Експерт" content={content} save={this.handleSave}/>
    )
  }
  
  handleSave(score) {
    this.props.route.onSave(score)
  }
}
