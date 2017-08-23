import React, { Component } from 'react'
import R from 'ramda'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

// How to use:
// <Field
//   name="tags"
//   component={renderTagInput}
//   holder="Add Extra Feature"
// />

class TagInput extends Component {
  constructor(props) {
    super(props)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = { tag: '' }
  }

  handleAddition() {
    const { value, onChange } = this.props
    const { tag } = this.state
    if (tag.length !== 0 && !R.contains(tag, value)) {
      onChange(R.append(tag, value))
      this.setState({ tag: '' })
    }
  }

  handleDelete(position) {
    const { value, onChange } = this.props
    onChange(R.remove(position, 1, value))
  }

  handleInputChange(event) {
    this.setState({ tag: event.target.value })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleAddition()
      event.preventDefault()
    }
  }

  render() {
    const { placeholder, value } = this.props

    return (
      <div>
        <div styleName="tag-input">
          <input
            value={this.state.tag}
            styleName="tag-input-field"
            placeholder={placeholder}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <div styleName="add-tag" onClick={this.handleAddition}>
            <img alt="add" src="/images/icons/plus.svg" />
          </div>
        </div>
        <div styleName="tags">
          {
            value && value.map((tag, index) => (
              <div key={index} styleName="tag-wrapper">
                <div styleName="tag">{ tag }</div>
                <div styleName="remove-tag" onClick={() => this.handleDelete(index)}>
                  <img alt="remove" src="/images/icons/plus.svg" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default cssModules(TagInput, styles, { allowMultiple: true })
