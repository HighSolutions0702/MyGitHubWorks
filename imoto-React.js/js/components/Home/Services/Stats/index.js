import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Home/Services/Stats/index.pcss'

class Stats extends Component {
  render() {
    return (
      <div styleName="wrapper" data-aos="fade-up">
        <div styleName="unit">
          <div styleName="quantity">
            1
            <div styleName="digit">
              <div data-aos="animate-two-numbers">
                <div>1</div>
                <div>2</div>
              </div>
            </div>
            ,
            <div styleName="digit">
              <div data-aos="animate-four-numbers">
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
              </div>
            </div>
            K
          </div>
          <div styleName="key">
              Photos Taken
            </div>
          <div styleName="description">
            Excepteur sint oident, sunt
            in culpa qui officia deserunt
          </div>
        </div>
        <div styleName="unit">
          <div styleName="quantity">
            <div styleName="digit">
              <div data-aos="animate-two-numbers">
                <div>2</div>
                <div>3</div>
              </div>
            </div>
            <div styleName="digit">
              <div data-aos="animate-three-numbers">
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
            </div>
            <div styleName="digit">
              <div data-aos="animate-four-numbers">
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
              </div>
            </div>
          </div>
          <div styleName="key">
            Satisfied Clients
          </div>
          <div styleName="description">
            Excepteur sint oident, sunt
            in culpa qui officia deserunt
          </div>
        </div>
        <div styleName="unit">
          <div styleName="quantity">
            <div styleName="digit">
              <div data-aos="animate-two-numbers">
                <div>1</div>
                <div>2</div>
              </div>
            </div>
            <div styleName="digit">
              <div data-aos="animate-six-numbers">
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
              </div>
            </div>
            <div styleName="digit">
              <div data-aos="animate-seven-numbers">
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
              </div>
            </div>
            0
          </div>
          <div styleName="key">
            MLS Listings
          </div>
          <div styleName="description">
            Excepteur sint oident, sunt
            in culpa qui officia deserunt
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Stats, styles)
