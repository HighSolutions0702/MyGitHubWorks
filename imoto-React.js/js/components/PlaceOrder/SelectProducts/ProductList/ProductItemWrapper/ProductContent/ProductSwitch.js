import React, { Component } from 'react'
import { Field } from 'redux-form'
import { renderSwitch } from 'utils/fieldRenderers'
import Switch from 'components/shared/Switch'
import Tooltip from 'components/shared/Tooltip'
import cssModules from 'react-css-modules'
import { createAttributeName } from 'utils/helpers'
import styles from './index.pcss'

class ProductSwitch extends Component {

  render() {
    const { attribute } = this.props
    const fieldName = createAttributeName(attribute)
    const data = attribute.data && JSON.parse(attribute.data)

    return (
      <div styleName="switch">
        <div styleName="switch-info">
          <div styleName="switch-title">
            {data.label}
          </div>
          <Tooltip text={data.description} />
        </div>
        <Field
          name={fieldName}
          component={renderSwitch}
        />
      </div>
    )
  }
}

export default cssModules(ProductSwitch, styles)
