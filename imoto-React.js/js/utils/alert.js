import R from 'ramda'
import SAlert from 'react-s-alert'

const defaultParams = {
  position: 'top',
  effect:   'genie',
  timeout:   5000
}
const wrapper = R.curry((func, message) => {
  const finalFunc = R.flip(func)(defaultParams)
  return R.type(message) === 'Array' ? R.forEach(finalFunc, message) : finalFunc(message)
})

export default {
  info:     wrapper(SAlert.info),
  warning:  wrapper(SAlert.warning),
  error:    wrapper(SAlert.error),
  success:  wrapper(SAlert.success),
  close:    SAlert.close,
  closeAll: SAlert.closeAll
}
