import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import Button from 'components/shared/Button'
import cssModules from 'react-css-modules'
import types from 'constants/actionTypes'
import CreditCard from './CreditCard'
import styles from '../index.pcss'

class PaymentMethods extends Component {
  constructor(props) {
    super(props)
    this.deleteCreditCard = this.deleteCreditCard.bind(this)
    this.showAddCreditCardForm = this.showAddCreditCardForm.bind(this)
    this.hideAddCreditCardForm = this.hideAddCreditCardForm.bind(this)
    this.state = {
      showAddCreditCardForm:false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.creditCards) {
      nextProps.dispatch({
        type:types.INIT_CREDIT_CARDS,
        payload:nextProps.creditCards
      })
    }
  }

  showAddCreditCardForm(e) {
    this.setState({
      showAddCreditCardForm:true
    })
  }

  hideAddCreditCardForm(e) {
    this.setState({
      showAddCreditCardForm:false
    })
  }

  deleteCreditCard(e, id) {
    new Promise((resolve, reject) =>
      this.props.dispatch({
        type: types.REMOVE_CREDIT_CARD_REQUEST,
        payload: {
          values:{ id },
          resolve,
          reject
        }
      })
    ).then(() => {
      this.setState({
        update:true
      })
    }).catch(() => {})
  }

  render() {
    const { actualCreditCards } = this.props

    return (
      <div className="field-fullwidth">
        <div styleName="payment-container">
          <div styleName="wrapper-head-container">
            <div styleName="head-container">
              <span styleName="name">Payment Methods</span>
              <span styleName="description">
                Card will be charged for services uses. All major credit cards accepted.
              </span>
            </div>
            <div styleName="button-container">
              {!this.state.showAddCreditCardForm && <Button
                size="xnormal"
                type="button"
                color="gray"
                onClick={(e) => this.showAddCreditCardForm(e)}
              >
                Add Credit Card
              </Button>}
            </div>
          </div>
          {this.state.showAddCreditCardForm && <CreditCard onSaveHandle={this.hideAddCreditCardForm} onCancelHandle={this.hideAddCreditCardForm} />}
          {actualCreditCards && actualCreditCards.map(
            (card) => (
              <div styleName="wrapper-credit-card-container">
                <div className="field-fullwidth">
                  <div styleName="credit-card-container">
                    <div styleName="head-container">
                      <div styleName="owner-name">
                        <span>{card.holder_name}</span>
                        <span styleName="xnumber"> {card.number}</span>
                      </div>
                      <div styleName="description">
                        <span styleName="date-wrapper">Expired on {card.expiration_date}</span>
                        <span> Added on {card.created_at}</span>
                      </div>
                    </div>
                    <div styleName="delete-mark-container">
                      <Button styleName="delete-mark" onClick={(e) => { this.deleteCreditCard(e, card.id) }}>
                        <img src={imagePath('/icons/close_mark.svg')} alt="close_mark" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        }
        </div>
      </div>
    )
  }
}
function select(state) {
  return { actualCreditCards : state.creditCard.creditCards }
}
export default connect(select)(reduxForm({
  form: 'paymentMethods'
})(cssModules(PaymentMethods, styles)))
