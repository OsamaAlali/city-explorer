import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import WeatherRender from "../components/WeatherRender";
import Error from "../components/Error";
import Movies from "../components/Movies";
import Weather from "../components/Weather";
import Map from "../components/Map";
import Search from "../components/Search";
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
      showMovies: false,
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

  showMovies = (e) => {
    //////////////
    //git Movie DATA
    //////////////
    try {
      axios
        .get(`${process.env.REACT_APP_URL}/movies?query=${this.state.cityName}`)
        .then((movieRespons) => {
       
          this.setState({
            showMovies: true,
            hassError: false,
            displayData: false,
            moviesData: movieRespons.data,
          });
        });
    } catch (error) {
      this.setState({
        hassError: true,
        showMovies: false,
      });
    }
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
            showMovies: false,
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
    } catch (error) {
      this.setState({
        hassError: true,
      });
    }
  };

  render() {
    return (
      <main>
        <Search
          gitCityDate={this.gitCityDate}
          gitCityName={this.gitCityName}
          showMovies={this.showMovies}
        />

        {this.state.hassError && (
          <Error
            show={this.state.hassError}
            message={this.state.errorMessage}
          />
        )}

        {/* ///////////////////////*/}

        {/* Called Map componets*/}
        {/* ///////////////////////*/}

        {this.state.displayData && !this.state.hassError && (
          <Map cityName={this.state.cityName} cityData={this.state.cityData} />
        )}
        
        {/* ///////////////////////*/}
        {/* Called Weather componets*/}
        {/* ///////////////////////*/}

        
          {this.state.displayData &&
            !this.state.hassError &&
            <WeatherRender 
            cityName= {this.state.cityName}
            weatherData={this.state.weatherData}
           
           />}
          

        
        {/* ///////////////////////*/}
        {/* Called Moives componets*/}
        {/* ///////////////////////*/}
          <div className="contanire-movies-card">
        {this.state.showMovies &&
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
