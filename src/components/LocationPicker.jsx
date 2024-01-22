import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationPicker = ({ onLocationSelect }) => {
  return (
    <MapContainer center={[-38.5545, -58.7396]} zoom={13} style={{ height: "500px", width: "100%" }} onClick={(e) => onLocationSelect(e.latlng)}>
      <ZoomControl position="topright" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[-38.5545, -58.7396]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};


export default LocationPicker;
