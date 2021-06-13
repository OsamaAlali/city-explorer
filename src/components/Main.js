import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

export class Main extends Component {
    constructor(props){
        super(props);
    
        this.state={
            cityName:'',
            cityData: {},
            displayData: false
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
            e.preventDefault();
         const axiosRespond=await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.832de4f31ebdd818d7f49b06b63b57ef&city=${this.state.cityName}&format=json`);
       
         console.log(axiosRespond.data[0]);
         this.setState({
             cityData:axiosRespond.data[0],
             displayData: true
         })
        }

    render() {
        return (
            <div>
                
  <Form onSubmit={this.gitCityDate} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>City Name</Form.Label>
    <Form.Control type="text" onChange={this.gitCityName} placeholder="Enter name" />
    
  </Form.Group>

  
  <Button variant="primary" type="submit">
    Submit
  </Button>

</Form>
       
{ this.state.displayData &&
        
<Card>
  <Card.Header>{this.state.cityName}</Card.Header>
  <Card.Body>
    <Card.Title>{this.state.cityData.display_name}</Card.Title>
    
    <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt=''   />
  </Card.Body>
</Card>

    }

            </div>
        )
    }
}

export default Main
