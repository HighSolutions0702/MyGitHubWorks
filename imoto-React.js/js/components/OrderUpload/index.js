import React, { Component } from 'react'
import Button from 'components/shared/Button'
import Layout from 'components/shared/Layout'
import PhotoShoot from 'components/OrderUpload/PhotoShoot'
import VirtualTwilight from 'components/OrderUpload/VirtualTwilight'
import VirtualStaging from 'components/OrderUpload/VirtualStaging'
import Video from 'components/OrderUpload/Video'
import ListingTeaser from 'components/OrderUpload/ListingTeaser'
import FloorPlan from 'components/OrderUpload/FloorPlan'
import DYIFloorPlan from 'components/OrderUpload/DYIFloorPlan'
import { connect } from 'react-redux'
import types from 'constants/actionTypes'
import cssModules from 'react-css-modules'
import * as ewarp from 'utils/ewarp/apiQueryGen'
import styles from './index.pcss'


class OrderUpload extends Component {

  constructor() {
    super()
    this.state = { uploadSuccessful: false }
    this.createOrder = this.createOrder.bind(this)
    this.onUploadEnd = this.onUploadEnd.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: types.GET_ORDER_FOR_UPLOAD_REQUEST, payload:{ order_id:this.props.order_id } })
  }


  onUploadEnd() {
    this.setState({
      uploadSuccessful: true
    })
  }

  createOrder() {
    const { dispatch, order } = this.props
    new Promise((resolve, reject) =>
      dispatch({ type: types.EWARP_CREATE_ORDER_REQUEST, payload: { query:ewarp.createOrder(order), resolve, reject } })
    ).then(() => (
      dispatch({ type: types.UPDATE_ORDER_STATUS_REQUEST, payload: { status:'in_progress', orderId:order.id } })
    ))
  }

  render() {
    const { child, path, order, photosUploaded } = this.props
    const listingTeaserInitialValues = order && {
      orderNumber:order.id,
      fullAddress:`${order.address}. ${order.second_address}, ${order.state_code} ${order.city} ${order.zip_code}`
    }
    return (
      <Layout>
        <div styleName="order-upload-wrapper">
          <div className="root">

            <div styleName="row">
              <div styleName="content">


                <div styleName="header-block-wrapper">
                  <div styleName="header-block">
                    <div styleName="page-number">1</div>
                    <div styleName="header-text">
                      <div styleName="header-main-text"><span styleName="link-text">Order # {order &&
                      order.id}</span> {order && order.address}, {order &&
                      order.city}, {order && order.state} {order &&
                      order.zip_code}</div>
                      <span styleName="sub-text">You can edit each field for each service order.</span>
                    </div>
                  </div>
                  <div styleName="button-right-header">
                    <Button
                      size="xsmall"
                      type="button"
                      color="white-gray"
                      styleName="upload-button"
                    >
                      Need help?
                    </Button>
                  </div>
                </div>

                {order && order.order_attributes &&
                order.order_attributes.map((product) => {
                  switch (product.name) {
                    case 'Photo Shoot': return <PhotoShoot product={product} onUploadEnd={this.onUploadEnd} />
                    case 'Virtual Twilight':
                      return photosUploaded && photosUploaded > 0 ?
                        <VirtualTwilight product={product} /> : null
                    case 'Virtual Staging':
                      return photosUploaded && photosUploaded > 0 ?
                        <VirtualStaging product={product} /> : null
                    case 'Video': return (<Video
                      product={product}
                      address={order.address}
                      beds={order.number_of_beds}
                      baths={order.number_of_baths}
                      listingPrice={order.listing_price}
                      squareFootage={order.square_footage}
                      onUploadEnd={this.onUploadEnd}
                    />)
                    case 'Listing Teaser': return (<ListingTeaser
                      product={product}
                      initialValues={listingTeaserInitialValues}
                    />)
                    case 'Floor plan': return <FloorPlan product={product} onUploadEnd={this.onUploadEnd} />
                    case 'DYI Floor plan': return <DYIFloorPlan product={product} onUploadEnd={this.onUploadEnd} />
                    default: return null
                  }
                })}

                <div styleName="footer-block-wrapper">

                  <div styleName="button-left">
                    <div styleName="footer-block">
                      <input type="checkbox" />
                      <div styleName="footer-text">
                        <span styleName="sub-text">Automatically submit for processing</span>
                      </div>
                    </div>
                  </div>
                  <div styleName="button-right">
                    {/* <Link to="/upload-order-review">*/}
                    <Button
                      size="xsmall" type="button" color="white-orange2"
                      styleName="upload-button"
                      onClick={this.createOrder}
                    >
                        CONTINUE
                      </Button>
                    {/* </Link>*/}
                  </div>
                </div>


              </div>

            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function select(state) {
  return {
    order:state.orderUpload.order,
    photosUploaded:state.orderUpload.photosUploaded,
    videoUploaded:state.orderUpload.videoUploaded
  }
}

export default connect(select)(cssModules(OrderUpload, styles))
