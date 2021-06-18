import React, { Component } from 'react'
import Card from "react-bootstrap/Card";

export class Movies extends Component {
    render() {
        return (
            
                <div className="movies-card">
                <Card>
            <Card.Header> {this.props.obj.title} </Card.Header>
            <Card.Body>
             Story :{this.props.obj.overview}
             <Card.Img
                src={`${this.props.obj.poster_path}`}
                alt=""
              />
         <Card.Img
                src={`https://image.tmdb.org/t/p/w500${this.props.obj.poster_path}`}
                alt=""
              />
             <hr />
             Vote:{this.props.obj.vote_count} <br />
             Popularity :{this.props.obj.popularity} <br />
             Release_date:{this.props.obj.release_date} <br />
            </Card.Body>
          </Card>

          </div>

           
        )
    }
}

export default Movies
