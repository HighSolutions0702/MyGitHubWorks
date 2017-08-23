import React from 'react'
import Input from 'components/shared/Fields/Input'
import TextArea from 'components/shared/Fields/TextArea'
import Checkbox from 'components/shared/Checkbox'
import TagInput from 'components/shared/TagInput'
import Select from 'components/shared/Select'
import DatePicker from 'components/shared/DatePicker'
import Switch from 'components/shared/Switch'
import ReCAPTCHA from 'react-google-recaptcha'
import config from 'constants/config'
import ReactSelect from 'react-select'

export const renderInput = field => (
  <Input
    {...field.input}
    fieldClassName={field.fieldClassName}
    simpleInput={field.simpleInput}
    holder={field.holder}
    type={field.type}
    errorMsg={field.meta.error}
    touched={field.meta.touched}
    hasError={field.meta.invalid}
    disabled={field.disabled}
  />
)

export const renderTextArea = field => (
  <TextArea
    {...field.input}
    fieldClassName={field.fieldClassName}
    simpleTextArea={field.simpleTextArea}
    holder={field.holder}
    errorMsg={field.meta.error}
    touched={field.meta.touched}
    hasError={field.meta.invalid}
    disabled={field.disabled}
  />
)

export const renderCheckbox = field => (
  <Checkbox
    {...field.input}
    description={field.description}
  />
)

export const renderDatepicker = field => (
  <DatePicker
    {...field.input}
    onChange={(value) => {
      field.input.onChange(value)
      if (field.onChange) {
        field.onChange(value)
      }
    }}
  />
)

export const renderSwitch = field => (
  <Switch
    {...field.input}
  />
)

export const renderCaptcha = field => (
  <div>
    <ReCAPTCHA sitekey={config.RECAPTCHA_SITE_KEY} onChange={field.input.onChange} />
    { field.meta.touched && <div style={{ color: '#E74C3C', fontSize: '13px' }}>{ field.meta.error }</div> }
  </div>
)

export const renderTagInput = field => (
  <TagInput {...field.input} placeholder={field.holder} />
)

export const renderSelect = field => (
  <Select
    {...field.input}
    options={field.options}
    error={field.meta.error}
    touched={field.meta.touched}
    wrapperClassName={field.wrapperClassName}
    holder={field.holder}
    productSingleSelect={field.productSingleSelect}
    searchable={field.searchable}
    onChange={(value) => {
      field.input.onChange(value)
      if (field.onChange) {
        field.onChange(value)
      }
    }}
  />
  )

export const renderSelectCreatable = field => (
  <ReactSelect.Creatable
    {...field}
    name={field.name}
    placeholder={field.holder}
    options={field.options}
    value={field.input.value}
    clearable={false}
    className={field.className}
    error={field.meta.error}
    touched={field.meta.touched}
    wrapperClassName={field.wrapperClassName}
    searchable
    promptTextCreator={field.promptTextCreator}
    searchPromptText={field.searchPromptText}
    valueRenderer={field.valueRenderer}
    arrowRenderer={({ onMouseDown }) => (<span onMouseDown={onMouseDown} />)}
    onBlur={(value) => {
      field.input.onBlur(field.input.value)
    }}
    onBlurResetsInput={false}
    onNewOptionClick={(props) => {
      field.input.value = props.value
      field.input.onBlur(props.value)
      field.onNewOptionClick(props)
    }}
    onChange={(value) => {
      field.input.onChange(value)
      if (field.onChange) {
        field.onChange(value)
      }
    }}
  />
)
