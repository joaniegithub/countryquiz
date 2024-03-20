import { useTheme } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import hash from 'object-hash';
import geojsonBbox from 'geojson-bbox';

import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { geo_config } from 'data/flagsAndGeo/geoConfig';

const GameMap = (props) => {
    const { country, border, sxOverrides } = props;
    const theme = useTheme();
	const [mapRef, setMapRef] = useState(undefined);

    const center = [51.505, -0.09];
	const setColor = ({ properties }) => {
		return { weight: 1, color: theme.palette.secondary.main };
	};

	const extent = geojsonBbox(geo_config[country]);

	const handleFeature = (feature, layer) => {
		// console.log("handleFeature feature", feature);
		// console.log("handleFeature layer", layer);
		mapRef.flyToBounds([
			[extent[1],extent[0]],
			[extent[3], extent[2]]
		], {duration: 0.5, padding: [30,30]});
	};

    return (
		<MapContainer 
			// ref={mapRef}
			id="mapSection" 
			center={center} zoom={1} 
			scrollWheelZoom={true}
			maxBounds={[[-80, -180], [90, 180]]}
			maxBoundsViscosity={1.0}
			whenReady={e => {
				setMapRef(e.target);
			}}
		>
			<TileLayer
				// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
				// noWrap
				
			/>
			<GeoJSON 
				// ref={groupRef}
				key={hash(country)}
				data={geo_config[country]} 
				style={setColor}
      			onEachFeature={(feature, layer) => handleFeature(feature, layer)}
			/>
		</MapContainer>
    );
};

export default GameMap;
