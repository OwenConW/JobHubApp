import L from 'leaflet';
import micon from './asset/marker.png';
import uicon from './asset/usericon.png';

export const markerIcon = L.icon({
    iconUrl: micon,
    iconRetinaUrl: micon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [70, 70],
    popupAnchor: [0, -43],
    className: 'leaflet-venue-icon'
});

export const userIcon = L.icon({
    iconUrl: uicon,
    iconRetinaUrl: uicon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [70, 70],
    popupAnchor: [0, -43],
    className: 'leaflet-venue-icon'
});
