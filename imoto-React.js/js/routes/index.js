import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import Orders from 'components/Account/Orders'
import AccountDetails from 'components/Account/AccountDetails'
import Download from 'components/Account/Orders/Download'
import App from 'components/App'
import HomePage from 'pages/HomePage'
import TeamPage from 'pages/TeamPage'
import AboutPage from 'pages/AboutPage'
import ProductPage from 'pages/ProductPage'
import PlaceOrderPage from 'pages/PlaceOrderPage'
import RegistrationPage from 'pages/RegistrationPage'
import LoginPage from 'pages/LoginPage'
import ForgotPasswordPage from 'pages/ForgotPasswordPage'
import ResetPasswordPage from 'pages/ResetPasswordPage'
import VirtualTourPage from 'pages/VirtualTourPage'
import AccountPage from 'pages/AccountPage'
import PhotographerPage from 'pages/PhotographerPage'
import PhotographerIndex from 'components/Photographer/Index/index.js'
import PhotographerOrders from 'components/Photographer/Orders'
import PhotographerCalendar from 'components/Photographer/Calendar'
import PhotographerAccountDetails from 'components/Photographer/AccountDetails'
import OrderUploadPage from 'pages/OrderUploadPage'
import Tour from 'pages/Tour'
import OrderUploadReviewPage from 'pages/OrderUploadReviewPage'

export const configureRoutes = (store) => {
  const switchPage = (targetRole, userRole, replace) => {
    if (targetRole !== userRole) {
      switch (userRole) {
        case 'Photographer':
          replace('/photographer')
          break
        default: replace('/account')
      }
    }
  }

  const requireAuth = (targetRole) => (nextState, replace, callback) => {
    const currentUser = store.getState().currentUser
    if (currentUser.isLoggedIn) switchPage(targetRole, currentUser.role, replace)
    else replace('/login')
    callback()
  }

  const requireNoAuth = (nextState, replace, callback) => {
    const currentUser = store.getState().currentUser
    if (currentUser.isLoggedIn) switchPage('', currentUser.role, replace)
    callback()
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="team" component={TeamPage} />
      <Route path="about" component={AboutPage} />
      <Route path="product" component={ProductPage} />
      <Route path="order" component={PlaceOrderPage} onEnter={requireAuth('Customer')} />
      <Route path="upload-order/:order" component={OrderUploadPage} />
      <Route path="upload-order-review/:order" component={OrderUploadReviewPage} />
      <Route path="get-started" component={RegistrationPage} />
      <Route path="registration-agent" component={RegistrationPage} />
      <Route path="registration-homeowner" component={RegistrationPage} />
      <Route path="login" component={LoginPage} onEnter={requireNoAuth} />
      <Route path="forgot-password" component={ForgotPasswordPage} onEnter={requireNoAuth} />
      <Route path="reset" component={ResetPasswordPage} onEnter={requireNoAuth} />
      <Route path="virtualtour" component={VirtualTourPage} />
      <Route path="tour/:orderId" component={Tour} />

      <Route path="photographer" component={PhotographerPage} onEnter={requireAuth('Photographer')} >
        <IndexRedirect to="index" />
        <Route path="index" component={PhotographerIndex} />
        <Route path="orders" component={PhotographerOrders} />
        <Route path="details" component={PhotographerAccountDetails} />
        <Route path="calendar" component={PhotographerCalendar} />
      </Route>

      <Route path="account" component={AccountPage} onEnter={requireAuth('Customer')} >
        <IndexRedirect to="details" />
        <Route path="orders" component={Orders} />
        <Route path="details" component={AccountDetails} />
        <Route path="orders/download/:download" component={Download} />
        <Route path="orders/virtualtour/:virtualtour" component={VirtualTourPage} />
      </Route>
    </Route>
  )
}
