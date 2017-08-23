import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import { Modal } from 'react-overlays'
import styles from 'components/shared/Modal/Base.pcss'
import { imagePath } from 'utils/helpers'

const Base = (props) => (
  <Modal
    aria-labelledby="modal-label"
    backdropClassName={styles.backdrop}
    className={styles.modal}
    onHide={props.onHide}
    show
  >
    <div styleName="wrapper">
      {
        props.exitButton ? <div onClick={props.onHide} styleName="close"><img src={imagePath('close.svg')} role="presentation" /></div> : null
      }
      <div styleName="window">
        <div styleName="context">
          {props.children}
        </div>
      </div>
    </div>
  </Modal>
)

export default cssModules(Base, styles, { allowMultiple: true })
