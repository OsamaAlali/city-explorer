import React, { Component } from 'react'
import Weather from '../components/Weather';
export class WeatherRender extends Component {
    render() {
        return (
            <div className="container-weather-card" id="container-weather-card">
                {
                 this.props.weatherData.map((obj) => {
              return <Weather obj={obj} cityName={this.props.cityName} />;
            })}
            </div>
        )
    }
}

export default WeatherRender
