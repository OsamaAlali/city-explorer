import React, { Component } from 'react'

import Card from "react-bootstrap/Card";
export class Map extends Component {
    render() {
        return (
             <div className="mapComponent"> 
            <div  className="map-card" >
                 <Card>
            <Card.Header>{this.props.cityName}</Card.Header>
            <Card.Body>
              <Card.Title>{this.props.cityData.display_name}</Card.Title>

              <Card.Img
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=15`}
                alt=""
              />
            </Card.Body>
          </Card>
            </div>

        </div>
        )
    }
}

export default Map
