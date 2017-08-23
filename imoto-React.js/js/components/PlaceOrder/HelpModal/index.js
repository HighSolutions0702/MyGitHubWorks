import React from 'react'
import cssModules from 'react-css-modules'
import { imagePath } from 'utils/helpers'
import styles from './index.pcss'

const HelpModal = (props) => {
  if (props.show !== false) {
    return (
      <div styleName="HelpModalContainer">
        <div styleName="white-box">
          <header>
            <h2>Need Help?</h2>
            <span>Please contact our customer support if need any assistance or have any questions.</span>
            <button styleName="close-modal" onClick={props.toggleHelp}><img src={imagePath('close.svg')} role="presentation" /></button>
          </header>
          <section>
            <h3>Phone Number</h3>
            <strong>1-888-316-8897</strong>
          </section>
          <footer>
            <button styleName="accept" onClick={props.toggleHelp}>Ok</button>
          </footer>
        </div>
      </div>
    )
  }

  return null
}

export default (cssModules(HelpModal, styles))
