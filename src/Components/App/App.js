import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { Badge } from 'reactstrap';
import jquery from 'jquery';

// import { Form, FormGroup, Button, Input, FormText } from 'reactstrap';
import FileInput from './../FileInput/FileInput'
import Player from './../Player/Player'

import logo from './../../Sound-Wave.png';
import './App.css';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      token: null,
      user: '',
      uri: null,
      embedded: null,
      userImage: null,
      title: '',
      newSelfie: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange = (event) => {
    this.setState({
      userImage: event.target.files[0],
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    let form_data = new FormData();
    form_data.append('userImage', this.state.userImage, this.state.userImage.name);
    

    for (const val of form_data) {
      console.log(val);
    }
    

    let url = '/api/upload';
    axios.post(url, form_data, {headers: {"Content-type": "multipart/form-data"}})
      .then(res => {
        this.setState({
          uri: res.data.uri,
          embedded: res.data.embedded,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const uri = this.state.uri;
    const embedded = this.state.embedded;
    const newSelfie = this.state.newSelfie;
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Welcome to the Face the Music.
        </h1>
        <div id="selfie-div">
          <p id="next-selfie">
            Upload a selfie below:
          </p>
          <FileInput
              formSubmit={this.handleSubmit}
              inputChange={this.handleImageChange}
          />
        </div>
        <div>
          {uri && (
            <Badge
              href={uri}
              color="success"
            >Play music on the app/web player.</Badge>
          )}
        </div>
        <div id="Player">
          {embedded && (
            <Player
              embedded={embedded}
            />
          )}
        </div>      
      </header>
      
    </div>
    );
  }
}

export default App;
