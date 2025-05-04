// src/pages/Mapa.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function Mapa() {
	const position: [number, number] = [51.505, -0.09];

	return (
	  <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "80vh", width: "70%" }}>
		<TileLayer
		  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<Marker position={position}>
		  <Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		  </Popup>
		</Marker>
	  </MapContainer>
	);
}
