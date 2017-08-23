import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import DependentKeyInput from './DependentKeyInput'
import DependentValueInput from './DependentValueInput'
import styles from '../index.pcss'

class DependentFields extends Component {

  render() {
    const { data, attribute, fieldsArray } = this.props
    return (
      <div>
        {fieldsArray.map((item, index) =>
          <div key={index} styleName="dependent-select-wrapper">
            <div styleName="dependent-select-field">
              <DependentKeyInput
                data={data}
                attribute={attribute}
                index={index}
              />
            </div>
            <div styleName="dependent-select-field">
              <DependentValueInput
                data={data}
                attribute={attribute}
                index={index}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default cssModules(DependentFields,
  styles, { allowMultiple: true })
