import R from 'ramda'
import shortid from 'shortid'

const clientId = 50100037
const productIdPhotoShoot = 50150001
const productIdTwilight = 50150002
const productIdVideo = 50400003
const productIdListingTeaser = 50400001
const productIdVirtualStaging = 50550005
const receivingCompany = 'ESVN'
const unit = 'Pcs'
const abcS = 'ABC_S'
const callbackUrl = 'http://imoto-dev.wiredqa.com/webhooks/ewarp/notify/'

export function batchReadyForProduction(batchId) {
  return {
    clientId,
    batchId,
    esoftsystemsCompany:receivingCompany // what this mean ?
  }
}


export function addMaterialsForBatch(orderReference, batchId, materials) {
  return {
    clientId,
    reference: orderReference,
    callbackUrl,
    batchId,
    materials
  }
}

export function createOrder(order) {
  const query = {
    clientId,
    receivingCompany,
    reference: order.id
  }
  const orderLines = R.filter(n => n !== null, order.order_attributes.map((product) => {
    switch (product.name) {
      case 'Photo Shoot' :
        return {
          productId:productIdPhotoShoot,
          quantity: product.quantity,
          unit,
          variant1: abcS,
          comments: [product.id]
        }
      case 'Twilight' :
        return {
          productId:productIdTwilight,
          quantity: product.quantity,
          unit,
          variant1: abcS,
          comments: R.prepend(product.id, product.materials)
        }
      case 'Virtual Staging' :
        return {
          productId:productIdVirtualStaging,
          quantity: product.quantity,
          unit,
          variant1: abcS,
          comments: R.prepend(product.id, product.materials ?
            product.materials.map((m) => (`${m.name} : ${m.room};`)) : [])
        }
      case 'Video' :
        return {
          productId:productIdVideo,
          quantity: product.quantity,
          unit,
          variant1: abcS,
          comments: [product.id,
            product.state && `Address: ${product.state.address}`,
            product.state && `Beds: ${product.state.beds}`,
            product.state && `Baths; ${product.state.baths}`,
            product.state && `Square footage: ${product.state.squareFootage}`,
            product.state && `Listing price: ${product.state.listingPrice}`,
            product.state && `Features: ${R.join(',', product.state.features)}`
          ]
        }
      case 'Listing Teaser':
        return {
          productId:productIdListingTeaser,
          quantity: product.quantity,
          unit,
          variant1: abcS,
          comments: [product.id,
            product.state && `OrderNumber: ${product.state.orderNumber}`
          ]
        }

      default:
        return null
    }
  }))
  return { ...query, orderLines }
}
