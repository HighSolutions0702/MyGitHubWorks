import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './index.pcss'


class UnorderedList extends Component {
  render() {
    const { items, dot } = this.props
    return (
      <div>
        <ul styleName="list" style={{ listStyleImage: dot }}>
          {
            items.map((item, index) =>
              <li key={index}>{item}</li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default cssModules(UnorderedList, styles, { allowMultiple: true })
