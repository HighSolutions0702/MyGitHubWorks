import React, { Component } from 'react'
import Alert from 'components/shared/Alert'


let AOS

if (process.env.__CLIENT__) {
  AOS = require('aos/dist/aos.js')
  require('aos/dist/aos.css')
}

class App extends Component {
  componentDidMount() {
    AOS.init({
      duration: 1000,
      once: true
    })
  }
  componentDidUpdate() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div className="app">
        <Alert />
        { this.props.children }
      </div>
    )
  }
}

export default App
