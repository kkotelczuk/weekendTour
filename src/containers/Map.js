/*global google*/

import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import LoadingIndicator from '../components/LoadingIndicator';
import AddNewPlaceModal from '../components/AddNewPlaceModal';
import '../style/Map.css';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAtractions: false,
      checkedViewpoints: false,
      checkedMonuments: false,
      distance: 0,
      location: { lat: 52.2306, lng: 19.3643 },
      isLoading: true
    }

    this.updateCheck = this.updateCheck.bind(this);
    this.handleDistanceSlider = this.handleDistanceSlider.bind(this);
    this.getMap = this.getMap.bind(this);
    this.handleAddNewPlace = this.handleAddNewPlace.bind(this);
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn) {
      this.props.history.push('/login');
    }
    
    navigator.geolocation.getCurrentPosition((data) => {
      this.setState(() => ({ location: { 
        lat: data.coords.latitude, 
        lng: data.coords.longitude 
       }}) 
      );
      this.getMap(12);
     }, () => {
      //if user won't agree to reveal location, we will show him full map of Poland
      //using lat and lng of central Poland hardcoded in the constructor     
      this.getMap(7);
    });
  }

  //temporary function to test current functionalities
  componentDidUpdate() {
    console.log(this.state);
  } 

  getMap(zoom) {
    const { lat, lng } = this.state.location;
    
    const map = new google.maps.Map(this.refs.map, {
      zoom,
      center: { lat, lng }
    });
    google.maps.event.addListenerOnce(map, 'idle',() => {
      this.setState(() =>({isLoading: false}))
    });
    google.maps.event.addListener(map, 'click', ({ga}) => this.setState({latLng: ga}));

  }

  handleAddNewPlace(data){
    this.setState( {latLng: null} );
    console.log(data)
  }

  handleDistanceSlider(e, value) {
    this.setState(() => ( {distance: value} ));
  }

  updateCheck(e) {
    switch(e.target.id) {
      case 'atractions':
        this.setState((prevState) => ({ checkedAtractions: !prevState.checkedAtractions }));
        break;
      case 'viewpoints':
        this.setState((prevState) => ({ checkedViewpoints: !prevState.checkedViewpoints }));
        break;
      case 'monuments':
        this.setState((prevState) => ({ checkedMonuments: !prevState.checkedMonuments }));
        break;
      default:
        console.log("Hmm, that default case shouldn't be triggered. You messed up something :)");
    }
  }

  render() {
    const sliderStyle = {
      width: '150px'
    }
    
    return (
      <div>
       {this.state.isLoading && <LoadingIndicator />}
       <AddNewPlaceModal latLng={this.state.latLng} onSubmit={this.handleAddNewPlace}></AddNewPlaceModal>
        <div className="options-panel">
          <Checkbox
            label="Atrakcje miejskie"
            id="atractions"
            checked={this.state.checkedAtractions}
            onCheck={this.updateCheck}
          />
          <Checkbox
            label="Punkty widokowe"
            id="viewpoints"
            checked={this.state.checkedViewpoints}
            onCheck={this.updateCheck}
          />
          <Checkbox
            label="Zabytki"
            id="monuments"
            checked={this.state.checkedMonuments}
            onCheck={this.updateCheck}
          />
        <div className="distance-label">Dystans: <span className="distance-value">{this.state.distance} km</span></div>
          <Slider
            min={0}
            max={15}
            step={1}
            value={this.state.distance}
            onChange={this.handleDistanceSlider}
            style={sliderStyle}
          />
        </div>
        <div className="map" ref="map"></div>
      </div>
    )
  }
}

export default Map;
