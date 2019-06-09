import './index.css';
import './node_modules/leaflet/dist/leaflet.css';
import './node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css';
import L from 'leaflet';
import './node_modules/leaflet-gpx/gpx.js';
import './node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js';

const BASEURL='https://tools.adfc-hamburg.de/umleitung/u1-ohlsdorf/';

function loadGPXLayer(color, gpxfile) {
    return new L.GPX(BASEURL + gpxfile,
              {
                  async: true,
                  polyline_options: {
                      color: color,
                      opacity: 0.75,
                      weight: 3,
                      lineCap: 'round'
                  },
                  marker_options: {
                      startIconUrl: BASEURL + 'pin-icon-start.png',
                      endIconUrl: BASEURL + 'pin-icon-end.png',
                      shadowUrl: BASEURL + 'pin-shadow.png'
                  }
              });
};
function osmLayer()  {
    return L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
        id: 'wikimedia',
    });
}
function loadMap(mapid, color, gpxfile) {

    var map = L.map(mapid).setView([53.6392, 10.0177], 13);
    map.addControl(new L.Control.Fullscreen());
    osmLayer().addTo(map);
    var gpxLayer=loadGPXLayer(color, gpxfile).on('loaded', function(e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);
}
loadMap('map-o-r3','blue','FR12_Ohlsdorf-Ring3.gpx');
loadMap('map-a-lm','red','StadtradAirport-LangenhornMarkt.gpx');
loadMap('map-o-lm','green', 'VR4_Ohlsdorf-LangenhornMarkt.gpx');

var map = L.map('map-all').setView([53.6392, 10.0177], 13);
osmLayer().addTo(map);
map.addControl(new L.Control.Fullscreen());
loadGPXLayer('blue', 'FR12_Ohlsdorf-Ring3.gpx').addTo(map);
loadGPXLayer('red', 'StadtradAirport-LangenhornMarkt.gpx').addTo(map);;
loadGPXLayer('green', 'VR4_Ohlsdorf-LangenhornMarkt.gpx').addTo(map);
