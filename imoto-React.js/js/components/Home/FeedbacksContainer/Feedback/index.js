import React, { Component } from 'react'
import styles from 'components/Home/FeedbacksContainer/Feedback/index.pcss'
import cssModules from 'react-css-modules'

class Feedback extends Component {

  render() {
    const { title, content, author, image, company, delay } = this.props
    return (
      <div data-aos="fade-up" data-aos-delay={delay} styleName="wrapper">
        { image ? <img src={image} alt="author" styleName="author-icon" /> : null }
        { title ? <div>{ title }</div> : null }
        <div>
          { content ? <p styleName="content">{ content }</p> : null }
          { author && company ? <p styleName="author">{ author }, { company }</p> : null }
        </div>
      </div>
    )
  }
}
export default cssModules(Feedback, styles)
