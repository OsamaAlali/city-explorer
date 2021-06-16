import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Error from "../components/Error";

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
         
        await axios.get(`${process.env.REACT_APP_URL}/movies?query=${this.state.cityName}`).then((movieRespons)=>{
             this.setState({
               moviesData: movieRespons.data
             })

        })


    } catch (error) {
      console.log(this.state.hassError);
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
        {this.state.hassError && <Error show={this.state.hassError} />}

        {this.state.displayData && !this.state.hassError && (
          <Card>
            <Card.Header>{this.state.cityName}</Card.Header>
            <Card.Body>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>

              <Card.Img
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`}
                alt=""
              />
            </Card.Body>
          </Card>
        )}
        {this.state.displayData &&
          !this.state.hassError &&
          this.state.weatherData.map((obj) => {
            return (
              <>
                <p>description:{obj.description} </p>

                <p>date:{obj.date} </p>
              </>
            );
          })}

{this.state.displayData && !this.state.hassError && (
          this.state.moviesData.map((obj)=>{
          return(
          <Card>
            <Card.Header> {obj.title} </Card.Header>
            <Card.Body>
             Story :{obj.overview}
             <Card.Img
                src={`${obj.poster_path}`}
                alt=""
              />
 <Card.Img
                src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
                alt=""
              />
             <hr />
             Vote:{obj.vote_count} <br />
             Popularity :{obj.popularity} <br />
             Release_date:{obj.release_date} <br />
            </Card.Body>
          </Card>
        )
      })
        )}

      </main>
    );
  }
}

export default Main;
