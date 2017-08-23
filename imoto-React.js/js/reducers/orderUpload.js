import types from 'constants/actionTypes'
import R from 'ramda'
import shortid from 'shortid'

const initialState = {}

function setP(state, payload) {
  return state.selectedPhotos ? R.merge(state, { selectedPhotos:
    state.selectedPhotos.map((p) => (p.id === payload.id ? Object.assign(p, { progress: payload.percent }) : p)) }) : state
}

function setV(state, payload) {
  return state.selectedVideo ? R.merge(state, { selectedVideo:
    state.selectedVideo.map((p) => (p.id === payload.id ? Object.assign(p, { progress: payload.percent }) : p)) }) : state
}

function setFP(state, payload) {
  return state.selectedFloorPlan ? R.merge(state, { selectedFloorPlan:
    state.selectedFloorPlan.map((p) => (p.id === payload.id ? Object.assign(p, { progress: payload.percent }) : p)) }) : state
}
function setDFP(state, payload) {
  return state.selectedDYIFloorPlan ? R.merge(state, { selectedDYIFloorPlan:
    state.selectedDYIFloorPlan.map((p) => (p.id === payload.id ? Object.assign(p, { progress: payload.percent }) : p)) }) : state
}

export default function orderUpload(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case types.UPLOAD_PROGRESS:
      return setDFP(setFP(setP(setV(state, payload), payload), payload), payload)
    case types.REMOVE_SELECTED_PHOTO:
      return Object.assign(state, {
        selectedPhotos: R.without([R.find(R.propEq('id', payload.id))(state.selectedPhotos)],
          state.selectedPhotos) })
    case types.REMOVE_SELECTED_VIDEO:
      return Object.assign(state, {
        selectedVideo: R.without([R.find(R.propEq('id', payload.id))(state.selectedVideo)],
          state.selectedVideo) })
    case types.REMOVE_SELECTED_FLOOR_PLAN:
      return Object.assign(state, {
        selectedFloorPlan: R.without([R.find(R.propEq('id', payload.id))(state.selectedFloorPlan)],
          state.selectedFloorPlan) })
    case types.REMOVE_SELECTED_DYI_FLOOR_PLAN:
      return Object.assign(state, {
        selectedDYIFloorPlan: R.without([R.find(R.propEq('id', payload.id))(state.selectedDYIFloorPlan)],
          state.selectedDYIFloorPlan) })
    case types.DELETE_ALL_PHOTOS_REQUEST:
      return R.merge(state, { selectedPhotos:[] })
    case types.SELECT_PHOTOS:
      return R.merge(state, { selectedPhotos: R.concat(state.selectedPhotos || [], payload && payload.map((p) => (
            Object.assign(p, {
              id: shortid.generate(),
              progress: 0
            })))) })
    case types.SELECT_VIDEO:
      return R.merge(state, { selectedVideo: payload && payload.map((p) => (Object.assign(p, {
        id: shortid.generate(),
        progress: 0
      }))) })
    case types.SELECT_FLOOR_PLAN:
      return R.merge(state, { selectedFloorPlan: payload && payload.map((p) => (Object.assign(p, {
        id: shortid.generate(),
        progress: 0
      }))) })
    case types.SELECT_DYI_FLOOR_PLAN:
      return R.merge(state, { selectedDYIFloorPlan: payload && payload.map((p) => (Object.assign(p, {
        id: shortid.generate(),
        progress: 0
      }))) })
    case types.EDIT_VIDEO_DETAILS:
    case types.LISTING_TEASER_CHANGE:
      return R.mergeAll(state, { order:{
        order_attributes:state.order.order_attributes.map(
          (a) => (a.id === payload.orderProductId ? Object.assign(a, { state:
            payload.state }) : a)) } })
    case types.GET_ORDER_FOR_UPLOAD_SUCCESS:
      return R.merge(state, { selectedVideo:null, selectedFloorPlan:null, selectedDYIFloorPlan:null, selectedPhotos:null, order: payload.order })
    case types.UPLOAD_PHOTOS_SUCCESS:
      return R.mergeAll(R.merge(state, { photosUploaded:payload.uploadedPhotos.length }), { order:{
        order_attributes:state.order.order_attributes.map(
          (a) => (a.id === payload.orderProductId ? Object.assign(a, { materials:
            payload.uploadedPhotos.map((r) => (r.material)) }) : a)) } })
    case types.UPLOAD_UPLOAD_FLOOR_PLAN_SUCCESS:
      return R.mergeAll(R.merge(state, { floorPlansUploaded:payload.uploadedPlans.length }), { order:{
        order_attributes:state.order.order_attributes.map(
          (a) => (a.id === payload.orderProductId ? Object.assign(a, { materials:
            payload.uploadedPlans.map((r) => (r.material)) }) : a)) } })
    case types.UPLOAD_UPLOAD_DYI_FLOOR_PLAN_SUCCESS:
      return R.mergeAll(R.merge(state, { DYIFloorPlansUploaded:payload.uploadedPlans.length }), { order:{
        order_attributes:state.order.order_attributes.map(
          (a) => (a.id === payload.orderProductId ? Object.assign(a, { materials:
            payload.uploadedPlans.map((r) => (r.material)) }) : a)) } })
    case types.UPLOAD_VIDEO_SUCCESS:
      return R.mergeAll(R.merge(state, { videosUploaded:payload.uploadedVideos.length }), { order:{
        order_attributes:state.order.order_attributes.map(
          (a) => (a.id === payload.orderProductId ? Object.assign(a, { materials:
            payload.uploadedVideos.map((r) => (r.material)) }) : a)) } })
    case types.TOGGLE_TWILIGHT_PHOTO:
      return R.mergeAll(state, { order:{ order_attributes:state.order.order_attributes.map(
        (a) => (a.id === payload.orderProductId && payload.material ? Object.assign(a, { materials:
          R.contains(payload.material, a.materials ? a.materials : []) ?
            R.without([payload.material], a.materials) :
            R.append(payload.material, a.materials ? a.materials : []) }) : a)) } })
    case types.TOGGLE_STAGING_PHOTO:
      return R.mergeAll(state, { order:{ order_attributes:state.order.order_attributes.map(
        (a) => (a.id === payload.orderProductId && payload.material ? Object.assign(a, { materials:
          R.find(R.propEq('name', payload.material), a.materials ? a.materials : []) ?
            R.without([R.find(R.propEq('name', payload.material), a.materials ? a.materials : [])], a.materials) :
            R.append({ name:payload.material, room:null, style:null }, a.materials ? a.materials : []) }) : a)) } })
    case types.CHANGE_ROOM_STAGING_PHOTO:
      return R.mergeAll(state, { order:{ order_attributes:state.order.order_attributes.map(
        (a) => (a.id === payload.orderProductId && payload.name ?
          Object.assign(a, { materials:a.materials.map((m) => (m.name === payload.name ?
            Object.assign(m, { room:payload.room }) : m)) }) : a)) } })
    case types.CHANGE_STYLE_STAGING_PHOTO:
      return R.mergeAll(state, { order:{ order_attributes:state.order.order_attributes.map(
        (a) => (a.id === payload.orderProductId && payload.name ?
          Object.assign(a, { materials:a.materials.map((m) => (m.name === payload.name ?
            Object.assign(m, { style:payload.style }) : m)) }) : a)) } })
    case types.EWARP_CREATE_ORDER_SUCCESS:
      return R.merge(state, {
        readyForAddMaterials:true,
        orderReference:payload.reference,
        batches:payload.orderLines.map(
            (ol) => ({ order_attribute:ol.comments[0], batchId:ol.batchId }))
      })
    default:
      return state
  }
}

