import R from 'ramda'
import Scroll, { scroller }  from 'react-scroll'

export const assocUid = R.assoc('uid')
export const onlyIds = R.project(['id', 'uid'])
export const mapKeys = R.curry((fn, obj) => R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj))))
export const mapValues = R.curry((fn, obj) => R.fromPairs(R.map(R.adjust(fn, 1), R.toPairs(obj))))

// appendWithOrderBy : String -> [a] -> [b] -> [b]
export const sortWithOrderBy = R.curry((prop, sortList, list) => (
  R.map((a) => R.find(R.propEq(prop, a), list), sortList))
)

// appendUniqWithOrderBy : String -> [a] -> [b] -> [b] -> [b]
export const appendUniqWithOrderBy = R.curry((prop, orderList, source, dest) => (
  R.compose(
    R.uniqBy(R.prop(prop)),
    R.concat(dest)
  )(sortWithOrderBy(prop)(orderList)(source))
))

export const appendUniqWithOrderById = appendUniqWithOrderBy('id')

// findBy :: (k: v) -> [(k: v)] -> (k: v)
export const findBy = R.curry((propObj, list) => (
  R.find(R.allPass(R.map((pair) => R.propEq(pair[0], pair[1]), R.toPairs(propObj))), list)
))

export const segmentOf = R.curry((index, str) => R.split('.', str)[index])
export const firstSegment = segmentOf(0)

export const capitalizeFirstLetter = (str = '') => str.charAt(0).toUpperCase() + str.slice(1)
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const noop = () => {}
export const imagePath = (path) => `/images/${path}`
export const videoPath = (path) => `/videos/${path}`
export const getProductId = (key) => key.slice(key.indexOf('_') + 1, key.indexOf('-'))
export const getAttributeKind = (key) => key.slice(0, key.indexOf('_'))
export const getAttributeId = (key) => key.slice(key.indexOf('-') + 1)
export const productPageScroll = (element) => {
  scroller.scrollTo(element, {
    duration: 1500,
    smooth: true,
    offset: -120
  })
}

export const virtualTourScroll = (element) => {
  scroller.scrollTo(element, {
    duration: 1500,
    smooth: true
  })
}

export const createAttributeName = (attr) => {
  const title = (() => {
    switch (attr.kind) {
      case 'single_select': return 'select'
      case 'dependent_select': return 'dependentSelect'
      case 'order_details': return 'orderDetails'
      default: return attr.kind
    }
  })()
  return `${title}_${attr.product.id}-${attr.id || attr.attribute_item_id}`
}

export const setPlaceOrderFormValue = (data, initialForm) => {
  const selectedProducts = data.order.products
  const values = {}
  const fieldsConstructor = (item) => {
    const productId = { product: { id: item.id } }
    const selectedAttr = item.selected_order_attributes
    selectedAttr.forEach((elem, i) => {
      const modifiedElem = Object.assign(elem, productId)
      const attributeData = JSON.parse(elem.data)
      const fieldName = createAttributeName(modifiedElem)
      const fieldValue = (() => {
        switch (elem.kind) {
          case 'hidden': return 'hidden'
          case 'input': return attributeData[0]
          case 'upload': return 'upload'
          case 'switch': return true
          case 'single_select': return { label: attributeData[0].key, value: attributeData[0].value }
          case 'tags': return attributeData
          case 'dependent_select': return +elem.quantity
          default: return null
        }
      })()
      values[fieldName] = fieldValue
      if (elem.kind === 'dependent_select') {
        attributeData.forEach((attrItem, j) => {
          const dependenFieldKey = `dep${elem.attribute_item_id}_key${j}`
          const dependenFieldValue = `dep${elem.attribute_item_id}_value${j}`
          values[dependenFieldValue] = attrItem.value
          values[dependenFieldKey] = attrItem.key
        })
      }
    })
  }

  selectedProducts.forEach(item => {
    fieldsConstructor(item)
  })
  const result = R.merge(initialForm, values)
  return result
}

export const countProductPrice = (selectedAttributes, attrItems) => selectedAttributes.reduce((sum, elem) => {
  const currentAttr = R.find(R.propEq('id', elem.id))(attrItems)
  const commonAttrPrice = +currentAttr.base_price
  const selectPrice = commonAttrPrice + (((elem.value.value || elem.value) - currentAttr.base_quantity) * currentAttr.additional_price)
  const squareBasedPrice = (commonAttrPrice + ((Math.ceil(parseInt(elem.value, 10) / +currentAttr.base_quantity) - 1) * currentAttr.additional_price) || 0)
  switch (elem.kind) {
    case 'hidden':
    case 'upload':
    case 'tags': return sum + commonAttrPrice
    case 'input': return squareBasedPrice
    case 'select': return +parseFloat(elem.value.price).toFixed(2)
    case 'dependentSelect': return sum + selectPrice
    case 'switch': return sum + (commonAttrPrice * elem.value)
    default: return null
  }
}, 0)

export const countProductQuantity = (selectedAttributes, attrItems) => selectedAttributes.reduce((sum, elem) => {
  const currentAttr = R.find(R.propEq('id', elem.id))(attrItems)
  switch (elem.kind) {
    case 'hidden':
    case 'input':
    case 'upload':
    case 'tags': return sum + 1
    case 'switch': return sum + elem.value
    case 'select': return sum + +elem.value.value
    case 'dependentSelect': return sum + (+elem.value || +elem.value.value)
    default: return null
  }
}, 0)

export const getProductAttributes = (formValues, productId) => {
  const productAttributes = []
  const productAttributesSetter = (value, key, object) => {
    const fieldProductId = getProductId(key)
    const kind = getAttributeKind(key)
    const attributeId = getAttributeId(key)
    const attributeItem = { id: attributeId, value, kind }

    if (fieldProductId === productId) {
      productAttributes.push(attributeItem)
    }
  }
  R.forEachObjIndexed(productAttributesSetter, formValues)
  return productAttributes
}

export const setProductListForm = (formValues) => {
  const productListFormObject = {
    attributes: []
  }

  const productAttributesSetter = (inputValue, key, object) => {
    const attributeKind = getAttributeKind(key)
    const attributeId = getAttributeId(key)


    switch (attributeKind) {
      case 'hidden':
      case 'input': {
        const attrValue = {
          id: attributeId,
          data: [{ key, value: inputValue }],
          quantity: '1'
        }
        productListFormObject.attributes.push(attrValue)
        break
      }
      case 'switch': {
        const attrValue = {
          id: getAttributeId(key),
          quantity: '1'
        }
        if (inputValue) {
          productListFormObject.attributes.push(attrValue)
        }
        break
      }
      case 'select': {
        const attrValue = {
          id: attributeId,
          data: [{ key: inputValue.label, value: inputValue.value }],
          quantity: inputValue.value
        }
        productListFormObject.attributes.push(attrValue)
        break
      }
      case 'tags': {
        const data = inputValue.map(item => ({ key: '', value: item }))
        const attrValue = {
          id: attributeId,
          data,
          quantity: '1'
        }
        productListFormObject.attributes.push(attrValue)
        break
      }
      case 'upload': {
        const attrValue = {
          id: attributeId,
          data: {},
          quantity: '1'
        }
        productListFormObject.attributes.push(attrValue)
        break
      }
      case 'dependentSelect': {
        const attributeValue = inputValue.value || inputValue
        const data = []
        const createDependentFields = (i) => {
          const dependentFieldsObj = {
            key: formValues[`dep${attributeId}_key${i}`].label || formValues[`dep${attributeId}_key${i}`],
            value: formValues[`dep${attributeId}_value${i}`]
          }
          data.push(dependentFieldsObj)
        }
        R.times(createDependentFields, attributeValue)

        const attrValue = {
          id: attributeId,
          data,
          quantity: `${data.length}`
        }
        productListFormObject.attributes.push(attrValue)
        break
      }
      default:
    }
  }
  R.forEachObjIndexed(productAttributesSetter, formValues)
  return productListFormObject
}


export const setErrorMessage = error => (
  error.graphQLErrors ? error.graphQLErrors.map(errorObj => errorObj.message).join('; ') : error.message
)

// this function for "download" reducer. We check what works are selected, what does not, what should be left

export const checkAllWorks = (work, action, item) => (
  // work has already been selected, it is from a different menu item
  (work.isSelectedWork && action.payload.itemName !== item.itemName) ||
  // Work has already been selected, it is the current menu and its serial number of the item is different from the selected works
  (work.isSelectedWork && action.payload.idWork !== work.idWork && action.payload.itemName === item.itemName) ||
  // Work has not yet been selected, it is the current menu item, its number matches the selected work
  (!work.isSelectedWork && action.payload.idWork === work.idWork && action.payload.itemName === item.itemName)
)
