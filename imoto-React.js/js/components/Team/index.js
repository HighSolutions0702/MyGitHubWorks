import React, { Component } from 'react'
import Layout from 'components/shared/Layout'
import Member from 'components/Team/Member'
import cssModules from 'react-css-modules'
import styles from 'components/Team/index.pcss'

class Team extends Component {
  render() {
    const executive = [
      <Member
        name="Darryl Glade"
        position="CEO - Co-founder"
        photo="/images/team/darryl-glade.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Hannah Walker"
        position="Senior Vice President"
        photo="/images/team/hannah-walker.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Marcus Barrell"
        position="Vice President Photography"
        photo="/images/team/marcus-burrell.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Darryl Glade"
        position="CEO - Co-founder"
        photo="/images/team/darryl-glade.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Hannah Walker"
        position="Senior Vice President"
        photo="/images/team/hannah-walker.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Marcus Barrell"
        position="Vice President Photography"
        photo="/images/team/marcus-burrell.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />
    ]
    const sales = [
      <Member
        name="Darryl Glade"
        position="CEO - Co-founder"
        photo="/images/team/darryl-glade.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Hannah Walker"
        position="Senior Vice President"
        photo="/images/team/hannah-walker.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />,
      <Member
        name="Marcus Barrell"
        position="Vice President Photography"
        photo="/images/team/marcus-burrell.png"
        description="Knowledge and experiences that spans over 20 years of technology, photography, animation, gaming and engineering from the Telco industry to the 3D Gaming industry. Educated at The Graphic Arts Institute of Denmark with a background in graphical communication."
      />
    ]
    return (
      <Layout>
        <div styleName="wrapper">
          <div styleName="content">
            <div styleName="section-name">
              Meet the IMOTO team
            </div>
            <div styleName="section-description">
              Executive Team
            </div>
            <div styleName="team-wrapper" className="root row">
              {
                executive.map((node, index) => <div styleName="member" key={index}>{ node }</div>)
              }
            </div>
            <div styleName="section-description">
              Sales Team
            </div>
            <div styleName="team-wrapper" className="root row">
              {
                sales.map((node, index) => <div styleName="member" key={index}>{ node }</div>)
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default cssModules(Team, styles)
