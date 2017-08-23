import React, { Component } from 'react'
import ProductFileUpload from './ProductFileUpload'
import ProductInput from './ProductInput'
import ProductSingleSelect from './ProductSingleSelect'
import ProductDependentSelect from './ProductDependentSelect'
import ProductSwitch from './ProductSwitch'
import ProductTags from './ProductTags'
import ProductOrderDetails from './ProductOrderDetails'


class ProductContent extends Component {

  render() {
    const { product, order } = this.props

    return (
      <div>
        {
          product.attribute_items.map((item, index) => {
            switch (item.kind) {
              case 'single_select': return <ProductSingleSelect key={index} attribute={item} />
              case 'dependent_select': return <ProductDependentSelect key={index} order={order} attribute={item} />
              case 'hidden': return <ProductInput key={index} attribute={item} hidden />
              case 'input': return <ProductInput key={index} order={order} attribute={item} />
              case 'upload': return <ProductFileUpload key={index} attribute={item} />
              case 'switch': return <ProductSwitch key={index} attribute={item} />
              case 'tags': return <ProductTags key={index} attribute={item} />
              case 'order_details': return <ProductOrderDetails key={index} attribute={item} />
              default: return null
            }
          })
        }
      </div>
    )
  }
}

export default ProductContent
