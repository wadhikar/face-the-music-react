import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

import logo from './../../Sound-Wave.png';
import './App.css';


function Player(props) {
  return (
    <iframe
      src={props.embedded}
      allow="encrypted-media"
      title="Spotify-Embedded-Player"
      width="300"
      height="380"
    >
    </iframe>
  );
}

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

  // Add an embedded player that will play playlist after it is retrieved
  // Add a button to open Spotify app if user wants to use native app instead
  render() {
    const uri = this.state.uri;
    const embedded = this.state.embedded;
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Welcome to the Face the Music.
        </h1>
        <p>
          Upload a selfie below:
        </p>
        <div id="selfie-div">
          {/* {!uri && !embedded  && ( */}
            {/* <FileInput
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            /> */}
            <form
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
              action=""
            >
            <p>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"  
                onChange={this.handleImageChange} 
                required  
              />
            </p>
            <input type="submit"/>
            </form>
          {/* )} */}
        </div>
        <div>
          {uri && (
            <a
              className="Spotify-button"
              href={uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play music on the app/web player.
            </a>
          )}
        </div>
        <div>
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
