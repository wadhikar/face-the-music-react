import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { Badge, Button } from 'reactstrap';
import * as rr from 'react-reveal/';

// import Fade from 'react-reveal/Fade';
// import RubberBand from 'react-reveal/RubberBand';

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
      newSelfie: true,
      isUploadState: false,
      isPlayState: true,
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
    this.handleScanButtonClick();
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

  handleScanButtonClick = event => {
    this.setState({
      isUploadState: !this.state.isUploadState,
      isPlayState: !this.state.isPlayState
    })
  }

  render() {
    const uri = this.state.uri;
    const embedded = this.state.embedded;
    const hideUploadForm = this.state.isPlayState;
    const showUploadForm = this.state.isUploadState;
    return (
      <div className="App">
      <header className="App-header">
        <rr.Bounce top>
            <img src={logo} className="App-logo" alt="logo" />
        </rr.Bounce>
        <h1>
          Welcome to Face the Music.
        </h1>
        <rr.Fade right>
          <p>
            What are you in the mood for?
          </p>
        </rr.Fade>
        <rr.Fade left>
          <p className="intro">
            Face the Music takes a selfie, scans your emotions, and finds you a playlist suitable for that mood.
          </p>
        </rr.Fade>
        <Button color="primary" onClick={this.handleScanButtonClick}>Start a scan!</Button>
        <rr.Roll right when={showUploadForm}>
          <div id="upload">
            <p id="next-selfie">
              Upload a selfie below to find a playlist:
            </p>
            <FileInput
                formSubmit={this.handleSubmit}
                inputChange={this.handleImageChange}
            />
          </div>
        </rr.Roll>
        <div>
          {uri && (
            <Badge
              href={uri}
              color="success"
            >
              Play music on the app/web player.
            </Badge>
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
