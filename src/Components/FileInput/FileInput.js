import React from 'react';

import { Form, FormGroup, Button, Input } from 'reactstrap';

class FileInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.fileInput = React.createRef();
  }
  
  // Give FileInput a handleSubmit function as a prop so that the JSON response can update the App state
  // Lift State up to App
  handleSubmit = (event) => this.props.formSubmit(event);
  handleChange = (event) => this.props.inputChange(event);
  
  render() {
    // const submitSelfieRetrievePlaylistInfo = this.props.submitSelfieRetrievePlaylistInfo;
    return (
      
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input
          onChange={this.handleChange}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
   }
}

export default FileInput;
