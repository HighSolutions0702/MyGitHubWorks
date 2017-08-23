import currentUser from 'reducers/currentUser'
import personalPhoto from 'reducers/personalPhoto'
import companyImage from 'reducers/companyImage'
import orderFromServer from 'reducers/orderFromServer'
import orders from 'reducers/orders'
import eWarpAPI from 'reducers/eWarpAPI'
import download from 'reducers/download'
import opacityHeader from 'reducers/opacityHeader'
import choosedCompany from 'reducers/choosedCompany'
import companyBranches from 'reducers/companyBranches'
import customerLocation from 'reducers/customerLocation'
import placeOrder from 'reducers/placeOrder'
import orderUpload from 'reducers/orderUpload'
import modal from 'reducers/modal'
import creditCard from 'reducers/creditCard'

export default {
  currentUser,
  personalPhoto,
  orderUpload,
  companyImage,
  orders,
  eWarpAPI,
  opacityHeader,
  choosedCompany,
  companyBranches,
  customerLocation,
  placeOrder,
  orderFromServer,
  modal,
  download,
  creditCard
}

