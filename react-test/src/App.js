import React, { Component } from 'react';
//import PageBlock from './components/PageBlock';
import Novice from './modules/Novice';
import Beginner from './modules/Beginner';
import Competent from './modules/Competent';
import Proficient from './modules/Proficient';
import Expert from './modules/Expert';
import Results from './modules/Results';
import Home from './modules/Home';
import './App.css';
import { Router, Route, hashHistory } from 'react-router'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "Іван",
      novice: [],
      beginner: [],
      competent: [],
      proficient: [],
      expert: [],
    }
    this.authUser = this.authUser.bind(this)
    this.getUsername = this.getUsername.bind(this)
    this.getScore = this.getScore.bind(this)
    
    this.saveNovice = this.saveNovice.bind(this)
    this.saveBeginner = this.saveBeginner.bind(this)
    this.saveCompetent = this.saveCompetent.bind(this)
    this.saveProficient = this.saveProficient.bind(this)
    this.saveExpert = this.saveExpert.bind(this)
  }
  
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route path="/" component={Home} onClick={this.authUser}/>
          <Route path="/novice" component={Novice} onSave={this.saveNovice}/>
          <Route path="/beginner" component={Beginner} onSave={this.saveBeginner}/>
          <Route path="/competent" component={Competent} onSave={this.saveCompetent}/>
          <Route path="/proficient" component={Proficient} onSave={this.saveProficient}/>
          <Route path="/expert" component={Expert} onSave={this.saveExpert}/>
          <Route path="/results" component={Results} getUsername={this.getUsername} getScore={this.getScore}/>
        </Router>
      </div>
    )
  }
  
  authUser(input) {
    this.setState({
      username: input
    })
    setTimeout(() => {hashHistory.push("/novice")}, 100)
  }
  
  getUsername() {
    return this.state.username
  }
  
  getScore() {
    return {novice: this.getSum(this.state.novice), 
            beginner: this.getSum(this.state.beginner), 
            competent: this.getSum(this.state.competent), 
            proficient: this.getSum(this.state.proficient), 
            expert: this.getSum(this.state.expert)}
  }
  
  getSum(input) {
    return input[0] + input[1] + input[2]
  }
  
  saveNovice(score) {
    this.setState({
      novice : score
    })
    setTimeout(() => {hashHistory.push("/beginner")}, 500)
  }
  
  saveBeginner(score) {
    this.setState({
      beginner : score
    })
    setTimeout(() => {hashHistory.push("/competent")}, 500)
  }
  
  saveCompetent(score) {
    this.setState({
      competent : score
    })
    setTimeout(() => {hashHistory.push("/proficient")}, 500)
  }
  
  saveProficient(score) {
    this.setState({
      proficient : score
    })
    setTimeout(() => {hashHistory.push("/expert")}, 500)
  }
  
  saveExpert(score) {
    this.setState({
      expert : score
    })
    setTimeout(() => {hashHistory.push("/results")}, 500)
  }
}
