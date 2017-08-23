import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/shared/Footer/FooterMenu/index.pcss'
import { Link } from 'react-router'

class FooterMenu extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div styleName="wrapper">
        <ul styleName="menu-footer">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/product">PRODUCTS</Link></li>
          <li><Link>ORDER</Link></li>
          <li><Link>RESOURCES</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link>CONTACTS</Link></li>
          <li><Link>BLOG</Link></li>
          <li><Link>JOBS</Link></li>
          <li><Link>FAQ</Link></li>
        </ul>
      </div>
    )
  }
}

export default cssModules(FooterMenu, styles)
