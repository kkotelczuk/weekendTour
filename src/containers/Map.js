/*global google*/

import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import LoadingIndicator from '../components/LoadingIndicator';
import '../style/Map.css';

class Map extends Component {
  map = null;
  constructor(props) {
    super(props);

    this.state = {
      checkedAtractions: false,
      checkedViewpoints: false,
      checkedMonuments: false,
      distance: 0,
      location: { lat: 52.2306, lng: 19.3643 },
      isLoading: true,
      markers: []
    }

    this.updateCheck = this.updateCheck.bind(this);
    this.handleDistanceSlider = this.handleDistanceSlider.bind(this);
    this.getMap = this.getMap.bind(this);
    this._clearMarkers = this._clearMarkers.bind(this);
    this._loadPlaces = this._loadPlaces.bind(this);
    this._placeMarkers = this._placeMarkers.bind(this);
  }

  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition((data) => {
      this.setState(() => ({ location: { 
        lat: data.coords.latitude, 
        lng: data.coords.longitude 
       }}) 
      );
      this.getMap(12);
      this._loadPlaces();
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
    
    this.map = new google.maps.Map(this.refs.map, {
      zoom,
      center: { lat, lng }
    });
    google.maps.event.addListenerOnce(this.map, 'idle',() => {
      this.setState(() =>({isLoading: false}))
    });
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
    this._loadPlaces();
  }
  _loadPlaces(){
    this._clearMarkers();
    if((!this.state.checkedAtractions && !this.state.checkedMonuments && !this.state.checkedViewpoints) || this.state.distance === 0){
      return;
    }
    let queries = [];

    this.state.checkedAtractions && queries.push('atractions');
    this.state.checkedMonuments && queries.push('viewpoints'); 
    this.state.checkedViewpoints && queries.push('monuments');
    console.log(queries);
    const location = new google.maps.LatLng(this.state.location.lat,this.state.location.lng);
    const service = new google.maps.places.PlacesService(this.map);
    const requests = queries.map(query=>{
      return {
        location: location,
        radius: this.state.distance * 1000,
        query: query
      }
    })
    requests.map(request=>service.textSearch(request, this._placeMarkers))
    
  } 
_clearMarkers(){
  const markers = this.state.markers;
  markers.map(marker=>{
    if(marker){
      marker.setMap(null);
    }
  });
  this.setState({markers: []});
}
async _placeMarkers(data){
  let markers = [];
  console.log(data);
  (data || []).map(async place=>{
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
      title: place.name
    });
    let photo = await this._loadPhoto(place);
    let content = `
    <div class="placeInfo">
      <img src="${photo}"/>
      <div class="info">
      <p class="name">
      ${place.name}
      </p>
      <p class="address">
      ${place.name}
      </p>
      </div>
    </div>
    `;
    let infowindow = new google.maps.InfoWindow({
      content
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    markers.push(marker);
  })
  const stateMarkers = this.state.markers;
  this.setState({markers: [...stateMarkers, markers]});
  
}
async _loadPhoto(place){
  if(!place.photos){
    return place.icon 
  }else{
    let url = '';
    url = await place.photos[0].getUrl({maxHeight: 100});
    return url;
  }
}
  render() {
    const sliderStyle = {
      width: '150px'
    }
    
    return (
      <div>
       {this.state.isLoading && <LoadingIndicator />}
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
