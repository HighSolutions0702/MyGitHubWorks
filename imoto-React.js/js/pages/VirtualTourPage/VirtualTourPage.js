import React, { Component, PropTypes } from 'react'
import VirtualTour from 'components/VirtualTour'
import { imagePath } from 'utils/helpers'

class VirtualTourPage extends Component {
  render() {
    const plans = [
      {
        src: imagePath('floor-plan.png'),
        title: 'image title'
      },
      {
        src: imagePath('floor-plan-2.png'),
        title: 'image title'
      },
      {
        src: imagePath('floor-plan.png'),
        title: 'image title'
      }
    ]
    return (
      <VirtualTour
        videos={['jtTBnsi_sDM', 'NWZ9ZonHjAQ']}
        videoBackground={imagePath('bg-1.jpg')}
        plans={plans}
      />
    )
  }
}

export default VirtualTourPage
