import React, { Component } from 'react';
import PageBlock from '../components/PageBlock';

export default class Novice extends Component {  
  constructor(props){
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }
  
  render() {
    const questions = ["Переживаєте за успіх в роботі?",
                       "Прагнете досягти швидко результату?",
                       "Чи потрібен чіткий алгоритм для вирішення задач?"]
                       
    const answers = []
    answers[0] = ["Сильно", "Не дуже", "Спокійний"]
    answers[1] = ["Поступово", "Якомога швидше", "Дуже"]
    answers[2] = ["Так", "В окремих випадках", "Не потрібен"]

    const points = []
    points[0] = [5, 3, 2]
    points[1] = [2, 3, 5]
    points[2] = [5, 3, 2]
    const content = {questions, answers, points}
    
    return(
      <PageBlock headerText="Новачок" content={content} save={this.handleSave}/>
    )
  }
  
  handleSave(score) {
    this.props.route.onSave(score)
  }
}
