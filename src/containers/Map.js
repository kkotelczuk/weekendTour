/*global google*/

import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';

import '../style/Map.css';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAtractions: false,
      checkedViewpoints: false,
      checkedMonuments: false,
      distance: 0
    }

    this.updateCheck = this.updateCheck.bind(this);
    this.handleDistanceSlider = this.handleDistanceSlider.bind(this);
  }

  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: 52.6783,
        lng: 22.4982
      }
    });
  }

  //temporary function to test current functionalities
  componentDidUpdate() {
    console.log(this.state);
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