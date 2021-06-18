import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Error from "../components/Error";
import Movies from "../components/Movies";
import Weather from "../components/Weather";
import Map from "../components/Map";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
      cityData: {},
      lat: "",
      lon: "",
      displayData: false,
      hassError: false,
      weatherData: [],
      moviesData: [],
    };
  } //end constructor

  gitCityName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      cityName: e.target.value,
    });
  };

  gitCityDate = async (e) => {
    console.log("gitCityDate");
    try {
      e.preventDefault();

      await axios
        .get(
          `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&city=${this.state.cityName}&format=json`
        )
        .then((locationResponde) => {
          this.setState({
            cityData: locationResponde.data[0],
            displayData: true,
            hassError: false,
            lat: locationResponde.data[0].lat,
            lon: locationResponde.data[0].lon,
          });
        });

      await axios
        .get(
          `${process.env.REACT_APP_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`
        )
        .then((weatherResponse) => {
          console.log("axios", this.state.weatherData);
          this.setState({
            weatherData: weatherResponse.data,
            displayData: true,
          });
        });
      //////////////
      //git Movie DATA
      //////////////

      await axios
        .get(`${process.env.REACT_APP_URL}/movies?query=${this.state.cityName}`)
        .then((movieRespons) => {
          this.setState({
            moviesData: movieRespons.data,
          });
        });
    } catch (error) {
      this.setState({
        hassError: true,
      });
    }
  };

  render() {
    return (
      <main>
        <Form onSubmit={this.gitCityDate}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.gitCityName}
              placeholder="Enter name"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>

        {/* ///////////////////////*/}
        {/* Called Map componets*/}
        {/* ///////////////////////*/}

        <div className="mapComponent">
          {this.state.hassError && <Error show={this.state.hassError} />}

          {this.state.displayData && !this.state.hassError && (
            <Map
              cityName={this.state.cityName}
              cityData={this.state.cityData}
            />
          )}
        </div>
       {/* ///////////////////////*/} 
        {/* ///////////////////////*/}
        {/* Called Weather componets*/}
        {/* ///////////////////////*/}

        <div className="container-weather-card">
          {this.state.displayData &&
            !this.state.hassError &&
            this.state.weatherData.map((obj) => {
              return <Weather obj={obj} cityName={this.state.cityName} />;
            })}
        </div>
        {/* ///////////////////////*/}
        {/* Called Moives componets*/}
        {/* ///////////////////////*/}
        <div>
          {this.state.displayData &&
            !this.state.hassError &&
            this.state.moviesData.map((obj) => {
              return <Movies obj={obj} />;
            })}
        </div>
      </main>
    );
  }
}

export default Main;
