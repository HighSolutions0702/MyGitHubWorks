import React from 'react'
import ReactSelect from 'react-select'
import R from 'ramda'
import classNames from 'classnames'

// order-select className specifies dropdown which is used on Order pages
// How to use:
// <Field
//   name="select"
//   component={renderSelect}
//   wrapperClassName="order-select"
//   options={[
//     { value: 1, label: 'one' },
//     { value: 2, label: 'two' },
//     { value: 3, label: 'three' }
//   ]}
// />

function Select(props) {
  const { value, productSingleSelect, onBlur, onChange, wrapperClassName, touched, error, holder, searchable } = props

  return (
    <div className={wrapperClassName}>
      <ReactSelect
        {...R.omit(['className'], props)}
        clearable={false}
        searchable={!!searchable}
        placeholder={holder}
        onBlur={() => onBlur(value)}
        onChange={(option) => onChange(productSingleSelect ? option : option.value)}
        className={classNames({ error: touched && error })}
      />
    </div>
  )
}

export default Select
