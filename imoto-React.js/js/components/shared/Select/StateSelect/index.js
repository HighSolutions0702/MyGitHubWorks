import React from 'react'
import ReactSelect from 'react-select'
import cssModules from 'react-css-modules'
import states from 'utils/states'
import classNames from 'classnames'
import R from 'ramda'
import styles from '../index.pcss'

const statesOptions = states.map((item, index) =>
   ({ label: item, value: item })
)

function StateSelect(field) {
  const { error, touched } = field.meta
  return (
    <div styleName="select-wrapper">
      <ReactSelect
        {...field.input}
        holder={field.holder}
        type={field.type}
        options={statesOptions}
        clearable={false}
        className={
          classNames(
            'form-select order-form-select',
            { errorPlaceholder: error && touched }
          )
        }
        searchable={false}
        placeholder="STATE"
        {...field}
      />
      {error && touched ? <div styleName="select-error">{error[0]}</div> : null}
    </div>
  )
}

export default cssModules(StateSelect, styles)
