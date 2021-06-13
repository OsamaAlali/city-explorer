import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
export class Error extends Component {
    render() {
        return (
            <>
            <Alert show={this.props.show} variant="success">
            <Alert.Heading>Error</Alert.Heading>
            <p>
            Please Enter the City name 
            </p>
            <hr />
           
          </Alert>
           </>
        )
    }
}

export default Error
