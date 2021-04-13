import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { Badge, Button } from 'reactstrap';
// TODO: Switch to more modern react-awesome-reveal
import { Bounce, Fade, Roll, Slide } from 'react-reveal/';

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
      emptyUpload: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange = event => {
    const userImage = event.target.files[0];
    
    if (userImage !== undefined) {
      this.setState({
        emptyUpload: false,
      });
    }
    
    this.setState({
      userImage: userImage,
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.userImage === null || this.state.userImage === undefined) {
      this.setState({
        emptyUpload: true
      });
      return;
    }

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
        });
      })
      .catch(err => console.log(err));
  }

  handleScanButtonClick = event => {
    this.setState({
      isUploadState: !this.state.isUploadState,
      isPlayState: !this.state.isPlayState
    });
  }

  render() {
    const uri = this.state.uri;
    const embedded = this.state.embedded;
    const showUploadForm = this.state.isUploadState;
    const emptyUpload = this.state.emptyUpload;

    return (
      <div className="App">
      <header className="App-header">
        <Bounce top>
            <img src={logo} className="App-logo" alt="logo" />
        </Bounce>
        <h1>
          Welcome to Face the Music.
        </h1>
        <Fade right>
          <p>
            What are you in the mood for?
          </p>
        </Fade>
        <Fade left>
          <p className="intro">
            Face the Music takes a selfie, scans your emotions, and finds you a playlist suitable for that mood.
          </p>
        </Fade>
        <Button color="primary" onClick={this.handleScanButtonClick}>Start a scan!</Button>
        <Roll right when={showUploadForm}>
          <div id="upload" style={{display: showUploadForm ? 'block' : 'none'}}>
            <p id="next-selfie">
              Upload a selfie below to find a playlist:
            </p>
            <FileInput
                formSubmit={this.handleSubmit}
                inputChange={this.handleImageChange}
            />
            <Fade bottom collapse when={emptyUpload}>
              <div className="invalid-feedback" style={{ display: 'block' }}>
                <p>
                  Please choose an image!
                </p>
              </div>
            </Fade>
          </div>
        </Roll>
        <Slide bottom>
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
        </Slide>      
      </header>
      
    </div>
    );
  }
}

export default App;
