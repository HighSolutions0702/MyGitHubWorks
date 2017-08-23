 /*eslint-disable  */
export const decimalNumber = (value) => {
  if (!value) {
    return value
  }
  const v = `${value}`.replace(/[^\d|\.]/g, '')
  const indexOfEqual = v.indexOf('.') === v.lastIndexOf('.')
  const modifiedValue = indexOfEqual ? v :
    `${v.slice(0, v.lastIndexOf('.'))}${v.slice(v.lastIndexOf('.') + 1, v.length)}`
  const numericValue = n => (!isNaN(parseFloat(n)) ? parseFloat(n) : '')
  const firstDot = v[v.length - 1] === '.' && indexOfEqual
  const normalized = firstDot ? v : `${numericValue(modifiedValue)}`
  const dotIndex = normalized.indexOf('.')
  const result = dotIndex < normalized.length - 3 && dotIndex !== -1 ?
    normalized.slice(0, dotIndex + 3) :
    normalized
  return result
}

export const currency = (value) => {
  const v = decimalNumber(value)
  const result = () => {
    const reverseString = string => string.split('').reverse().join('')
    const intermediateValue = value => reverseString(value).match(/.{1,3}/g)
    let newValue
    if(v.indexOf('.') === -1) {
      newValue = reverseString(intermediateValue(v).join(','))
      return `$${newValue}`
    }
    const cutedValue = v.slice(0, v.indexOf('.'))
    const remainder = v.slice(v.indexOf('.'))
    newValue = reverseString(intermediateValue(cutedValue).join(','))
    return `$${newValue}${remainder}`
  }
  return v ? result() : ''
}

export const zipCode = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 5) {
      return `${onlyNums}`
    }
  }
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 9)}`
}

export const numberValue = (value) => {
  const v = `${value}`.replace(/[^\d|\.]/g, '')
  return v ? parseFloat(`${v}`, 0).toString() : v
}

export const numberWithDots = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = `${value}`.replace(/[^\d|\.]/g, '')
  return onlyNums
}

export const cardNumber = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 4) {
      return `${onlyNums}-`
    }
    if (onlyNums.length === 8) {
      return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}-`
    }
    if (onlyNums.length === 12) {
      return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}-${onlyNums.slice(8, 12)}-`
    }
  }
  if (onlyNums.length <= 4) {
    return onlyNums
  }
  if (onlyNums.length <= 8) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}-${onlyNums.slice(8, 12)}`
  }
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 8)}-${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 19)}`
}

export const cvv = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  return `${onlyNums.slice(0, 3)}`
}

export const expirationDate = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 2) {
      return `${onlyNums}/`
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 6)}`
}
 /*eslint-enable  */
