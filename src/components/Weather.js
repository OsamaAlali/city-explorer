import React, { Component } from "react";

export class Weather extends Component {
  render() {
    return (
      <div className="weatherData">
        <div class="card">
          <div class="card-header">{this.props.cityName} Weather Status</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Description: {this.props.obj.description}
            </li>
            <li class="list-group-item">Date:{this.props.obj.date}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Weather;
