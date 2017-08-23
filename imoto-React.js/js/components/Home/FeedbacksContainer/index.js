import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Home/FeedbacksContainer/index.pcss'
import SlickSlider from 'react-slick'
import Feedback from 'components/Home/FeedbacksContainer/Feedback'
import { imagePath } from 'utils/helpers'

class FeedbacksContainer extends Component {
  componentDidMount() {

  }
  render() {
    const { title, bottomContent } = this.props
    const sliderSettings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      className: 'tile-table__box',
      ref: 'slider',
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } }
      ]
    }
    const children = [
      <Feedback
        delay="200"
        content={'"Proin at scelerisque arcu. Phasellus id purus magna. Nullam quis quam molestie, convallis orci in, gravida orci."'}
        author="Jason Statham"
        company="Realty Brothers"
        image={imagePath('feedbacks/statham.png')}
      />,
      <Feedback
        delay="400"
        content={'"Proin at scelerisque arcu. Phasellus id purus magna. Nullam quis quam molestie, convallis orci in, gravida orci."'}
        author="Jason Statham"
        company="Realty Brothers"
        image={imagePath('feedbacks/statham.png')}
      />,
      <Feedback
        delay="600"
        content={'"Proin at scelerisque arcu. Phasellus id purus magna. Nullam quis quam molestie, convallis orci in, gravida orci."'}
        author="Jason Statham"
        company="Realty Brothers"
        image={imagePath('feedbacks/statham.png')}
      />
    ]
    return (
      <div className="root">
        <div styleName="wrapper">
          <div styleName="partners">
            <div
              styleName="partners-logo"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-offset="100"
            >
              <img src={imagePath('partners/better-homes.png')} alt="partner" />
            </div>
            <div
              styleName="partners-logo"
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-offset="100"
            >
              <img src={imagePath('partners/latter.png')} alt="partner" />
            </div>
            <div
              styleName="partners-logo"
              data-aos="fade-up"
              data-aos-delay="800"
              data-aos-offset="100"
            >
              <img src={imagePath('partners/gardner.png')} alt="partner" />
            </div>
            <div
              styleName="partners-logo"
              data-aos="fade-up"
              data-aos-delay="900"
              data-aos-offset="100"
            >
              <img src={imagePath('partners/redfin.svg')} alt="partner" />
            </div>
          </div>
          <div styleName="head-section">
            <div styleName="bg">
              Feedback
            </div>
            <div styleName="header">
              Client Testimonials
            </div>
            <div styleName="description">
              What our clients are saying about us
            </div>
            <div><img src={imagePath('icons/rounds.svg')} alt="rounds" /></div>
          </div>
          <div className="tile-table slider">
            <div className="title title--type20">
              <h1>{ title }</h1>
              <div className="separator" />
            </div>
            <div styleName="slider-wrapper">
              <SlickSlider {...sliderSettings}>
                {
                  children.map((node, index) => (
                    <div key={index}>
                      { node }
                    </div>
                  ))
                }
              </SlickSlider>
            </div>
            { bottomContent }
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(FeedbacksContainer, styles)
