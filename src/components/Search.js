import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export class Search extends Component {
    render() {
        return (
            <div>
                 <Form onSubmit={this.props.gitCityDate}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.props.gitCityName}
              placeholder="Enter name"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
         <Button onClick={this.props.showMovies} > show Movies</Button>
        </Form>
            </div>
        )
    }
}

export default Search
