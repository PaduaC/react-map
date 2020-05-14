import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker} from 'react-map-gl';
import * as medData from './data/med-info.json';
import 'mapbox-gl/dist/mapbox-gl.css';


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
      }
    };
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
      {medData.dispos.map(med => 
        <Marker 
          key={med.id} 
          latitude={med.coordinates[1]} 
          longitude={med.coordinates[0]}
        >
          <button class="marker-btn">
            <img src="weed.svg" alt="x" height="30px" width="30px" />
          </button>
        </Marker>
      )}
      </MapGL>
    );
  }
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));

export default Root;
