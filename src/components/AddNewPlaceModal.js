import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ModalWrapper from './ModalWrapper'
import '../style/AddNewPlaceModal.css';

class AddNewPlaceModal extends Component {
  required = ['name', 'lat', 'lng']
  constructor(props) {
    super(props)
    this.state = {
      location: {
        lat: '',
        lng: ''
      },
      errors: {
        name: null,
        lat: null,
        lng: null,
        desc: null,
        website: null
      }
    }
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleSave = this
      .handleSave
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleCoverClick = this
      .handleCoverClick
      .bind(this);
    this.validate = this
      .validate
      .bind(this);
  }
  componentWillReceiveProps({latLng}) {
    let location = latLng
      ? {
        lat: latLng.x,
        lng: latLng.y
      }
      : {
        lat: null,
        lng: null
      }

    this.setState({location})
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let validated = this.validate(form);
    if (validated) {
      this.handleSave(validated)
    }
  }
  handleSave(data) {
    this.setState({
      errors: {
        name: null,
        lat: null,
        lng: null,
        desc: null,
        website: null
      }
    });
    this
      .props
      .onSubmit(data)
  }
  handleChange(e) {
    const location = this.state.location
    location[e.target.name] = e.target.value;
    this.setState({location: location})
  };
  handleCoverClick(e) {
    this.handleSave(false)
  };
  validate(form) {
    let errors = {};
    let isValid = true;
    let data = {
      name: form.name.value,
      lat: form.lat.value,
      lng: form.lng.value,
      desc: form.desc.value,
      website: form.website.value
    }
    Object
      .keys(data)
      .forEach(field => {
        errors[field] = !data[field] && (this.required.indexOf(field) > -1) && `${field === 'desc'
          ? 'description'
          : field} is required`;
        isValid = isValid && !errors[field];
      })
    this.setState({errors});
    return isValid && data;
  }
  render() {
    return (
      <ModalWrapper
        isOpened={!!this.props.latLng}
        onCoverClick={this.handleCoverClick}>
        <form onSubmit={this.handleSubmit} className="newPlaceForm">
          <p>Add new place</p>
          <TextField
            className="input"
            name="name"
            type="text"
            hintText="Name"
            errorText={this.state.errors.name}/>
          <div className="row">
            <TextField
              className="input"
              name="lat"
              type="text"
              value={this.state.location.lat}
              hintText="Location lat"
              onChange={this.handleChange}
              errorText={this.state.errors.lat}/>
            <TextField
              className="input"
              name="lng"
              type="text"
              value={this.state.location.lng}
              hintText="Location lng"
              onChange={this.handleChange}
              errorText={this.state.errors.lng}/>
          </div>
          <TextField
            className="input"
            name="desc"
            type="text"
            hintText="Description"
            errorText={this.state.errors.desc}/>
          <TextField
            className="input"
            name="website"
            type="text"
            hintText="Website link"
            errorText={this.state.errors.website}/>
          <RaisedButton className="submitBtn" label="Add" primary={true} type="submit"/>
        </form>

      </ModalWrapper>
    );
  }

}

export default AddNewPlaceModal;
