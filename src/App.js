import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup} from 'react-map-gl';
import * as medData from './data/med-info.json';
import 'mapbox-gl/dist/mapbox-gl.css';

import MedInfo from './medinfo'


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 41.5951,
        longitude: -72.6454,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }


_renderCityMarker = (med, index) => {
  return(
    <Marker 
        key={`marker-${index}`} 
        latitude={med.coordinates[1]} 
        longitude={med.coordinates[0]}
      >
        <button 
          className="marker-btn"
          onClick={() => this.setState({popupInfo: med})}
        >
          <img src="weed.svg" alt="x" height="30px" width="30px" />
        </button>
      </Marker>
  )    
}

_updateViewport = viewport => {
    this.setState({viewport});
  };

_onClickMarker = med => {
  this.setState({popupInfo: med})
}

_renderPopup() {
  const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.coordinates[0]}
          latitude={popupInfo.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <MedInfo info={popupInfo} />
        </Popup>
      )
    );
}

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/paduac/cka3d505900wa1ipi02v9on7h"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
      
      {medData.dispos.map(this._renderCityMarker)}
      {this._renderPopup()}

      </MapGL>
    );
  }
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));

export default Root;
