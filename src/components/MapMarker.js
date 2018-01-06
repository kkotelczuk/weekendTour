/*global google*/

class MapMarker {
	constructor(props) {
		this.map = props.map;
		this.name = props.name;
		this.position = {
			lat: parseFloat(props.lat),
			lng: parseFloat(props.lng)
		}

		this.desc = props.desc || '';
		this.website = props.website || '';

		var iconType = '';
		if (props.nearbyPlaces > 0 && props.nearbyPlaces <= 3) {
			iconType = props.nearbyPlaces;
		} else if (props.nearbyPlaces > 3) {
			iconType = 3;
		}

		this.icon = `/images/MapMarkerIcon${iconType}.svg`;

		/**
		 * Google map marker object. You can use is with maps easly.
		 *
		 * @type {google.maps.Marker}
		 */
		this.googleMarker = null;
	}

	/**
	 * Creates google.maps.Marker
	 *
	 * @returns {google.maps.Marker}
	 */
	create() {
		this.googleMarker = new google.maps.Marker(this);

		return this.googleMarker;
	}
}

export default MapMarker;