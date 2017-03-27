import React, { Component } from 'react';
import Header from '../components/Header';
import {Line} from 'react-chartjs-2';
import { Link } from 'react-router'

export default class Results extends Component {
  render(){
    const score = this.props.route.getScore();
    const data = {
      labels: ['Новачок', 'Початківець', 'Компетентний', 'Досвідчений', 'Експерт'],
      datasets: [
        {
          label: 'Ваш рівень досвідченості',
          data: [score.novice, score.beginner, score.competent, score.proficient, score.expert],
        }
      ]
    };
    return (     
      <div className="page-block animated fadeIn">
        <Header text={'Результати ' + this.props.route.getUsername() + 'а'}/>
        <div className="container card">
          <div className="col-xs-12">
            <br/>
            <Line data={data} width={100} height={37} />
          </div>
          <div className="bot-links col-md-12">
            <button className="btn btn-default"><Link to="/">Пройти ще раз</Link></button>
            <button className="btn btn-default"><Link to="/novice">Новачок</Link></button>
            <button className="btn btn-default"><Link to="/beginner">Початківець</Link></button>
            <button className="btn btn-default"><Link to="/competent">Компетентний</Link></button>
            <button className="btn btn-default"><Link to="/proficient">Досвідчений</Link></button>
            <button className="btn btn-default"><Link to="/expert">Експерт</Link></button>
          </div>
        </div>
      </div>
    )
  }
}
