import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Error from '../components/Error'

export class Main extends Component {
    constructor(props){
        super(props);
    
        this.state={
            cityName:'',
            cityData: {},
            displayData: false,
            hassError: false,
            weatherData: [],

        }
    }//end constructor

        gitCityName = (e) => {
          e.preventDefault()
          console.log(e.target.value);
          this.setState({
              cityName: e.target.value
          })
        }

       gitCityDate=async (e)=>{
          try { e.preventDefault();
           
         const axiosRespond=await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&city=${this.state.cityName}&format=json`);
         
          const myApiRes= await axios.get(`${process.env.REACT_APP_URL}/weather`);

     console.log('aaaaaaaaaaaaaaaaa',myApiRes);
         console.log('axios Respon',axiosRespond);
         this.setState({
             cityData:axiosRespond.data[0],
             displayData: true,
           hassError:false,
           weatherData: myApiRes.data.data,
             
         })
        }
       
        catch(error){
            console.log(this.state.hassError);
            this.setState({
                hassError: true,
               
            })
            console.log('watherrrrrrrr',this.state.weatherData);
            console.log(this.state.hassError);
        }
        }
       
    render() {
        return (
            <main>
                
  <Form onSubmit={this.gitCityDate} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>City Name</Form.Label>
    <Form.Control type="text" onChange={this.gitCityName} placeholder="Enter name" />
    
  </Form.Group>

  
  <Button variant="primary" type="submit">
  Explore
  </Button>

</Form>
       {this.state.hassError &&  <Error show={this.state.hassError}/> }
      
      
{ this.state.displayData && !this.state.hassError &&
        
<Card>
  <Card.Header>{this.state.cityName}</Card.Header>
  <Card.Body>
    <Card.Title>{this.state.cityData.display_name}</Card.Title>
    
    <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt=''   />
  </Card.Body>
</Card>
     
     
     
    }

{          this.state.displayData && !this.state.hassError        &&
  this.state.weatherData.map((item) => {
    return(
      <>
      <p>Name {item.weather.code} </p>
    
      <p>LON: {item.wind_cdir_full} </p>
      
      
         </>

    
    
    
    
      ) 
  
  })
        
 
 }
</main>
        )
    }
}

export default Main
