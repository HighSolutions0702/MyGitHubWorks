import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from 'components/Product/index.pcss'
import UnorderedList from 'components/shared/UnorderedList'
import Button from 'components/shared/Button'
import { imagePath } from 'utils/helpers'

class FloorPlan extends Component {
  render() {
    const floorItems = [
      '24 Hour Turnaround',
      'Online Download'
    ]
    return (
      <div className="root">
        <div styleName="wrapper floor-plan">
          <div styleName="section-name">
            FLOOR PLAN
          </div>
          <div styleName="section-header">
            Give potential buyers an understanding
            of your listing’s layout, before they
            ever enter the home!
          </div>
          <div styleName="img-container">
            <img src={imagePath('floor-plan.png')} alt="floor plan" />
          </div>
          <div styleName="product-text-wrapper">
            <div styleName="section-description">
              The
              <span styleName="imoto"> IMOTO </span>
              floor plan is a great marketing tool
              that provides buyers with incredibly
              useful information about a listing.
            </div>
            <div styleName="paragraph">
              Using this tool, buyers are able to envision
              the layout of the listing, without stepping
              inside. This serves as a great way to entice
              buyers to come and visit the listing in person,
              and it allows buyers to begin envisioning
              themselves living in the home.
            </div>
            <div styleName="paragraph">
              Using a laser measuring tool, our IMOTO
              photographer will take all the measurements
              for the floorplan on-site, when he/she come
              to the listing. Within 24 hours of the
              appointment, your user-friendly floor plan
              will be ready.
            </div>
            <div styleName="note">
              *Please note that total square footage is not given.
            </div>
            <div styleName="paragraph">
              If you already have architectural plans or
              construction plans, IMOTO can give them that
              welcoming feel for only $40 with the DIY
              Floor Plan
            </div>
            <div styleName="list-header">
              <span>All of our videos come with the following items for</span>
              <span styleName="free"> FREE</span>
            </div>
            <UnorderedList
              items={floorItems}
              dot="url(/images/icons/check-blue.png)"
            />
          </div>
          <div styleName="section-link">
            Prices From $75
            <Link to={'/order'}>
              <Button styleName="order-button">
                PLACE ORDER
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(FloorPlan, styles, { allowMultiple: true })
