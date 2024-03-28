import { useTheme } from '@emotion/react';
import { geo_config } from 'data/flagsAndGeo/geoConfig';
import geojsonBbox from 'geojson-bbox';
import 'leaflet/dist/leaflet.css';
import hash from 'object-hash';
import * as React from 'react';
import { useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import { useCurrentGame } from 'store/selector';

const GameMap = (props) => {
    const { country } = props;
    const theme = useTheme();
    const game = useCurrentGame();
    const [mapRef, setMapRef] = useState(undefined);
    // const [countryJson, setCountryJson] = useState(undefined);
    // const [countryHash, setCountryHash] = useState(undefined);

	// useEffect(() => {
	// 	const jsonPath = `${process.env.PUBLIC_URL}/assets/flagsAndGeo/geo/${country.toLowerCase()}.geo.json`;
	// 	fetch(`${jsonPath}`)
	// 		.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}
	// 			return response.json();
	// 		})
	// 		.then((jsonData) => {
	// 			console.log(jsonData); // it correctly prints json file.
	// 			setCountryHash(country);
	// 			setCountryJson(jsonData);
	// 		});
	// }, [country]);

    const center = [51.505, -0.09];
    const setColor = ({ properties }) => {
        return { weight: 1, color: theme.palette.success.main };
    };

	// if (!countryJson) {
	// 	return null;
	// }

    // const extent = geojsonBbox(countryJson);
    const extent = geojsonBbox(geo_config[country]);

    const handleFeature = (feature, layer) => {
        // console.log("handleFeature feature", feature);
        // console.log("handleFeature layer", layer);
        mapRef.flyToBounds(
            [
                [extent[1], extent[0]],
                [extent[3], extent[2]],
            ],
            { duration: 0.5, padding: [30, 30] }
        );
    };
	console.log(game.hideBackgroundMap);

    return (
        <MapContainer
            // ref={mapRef}
            id="mapSection"
            center={center}
            zoom={1}
            scrollWheelZoom={true}
            maxBounds={[
                [-80, -180],
                [90, 180],
            ]}
            maxBoundsViscosity={1.0}
            whenReady={(e) => {
                setMapRef(e.target);
            }}
        >
			{!game.hideBackgroundMap && (
				<TileLayer
					// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
					// noWrap
				/>
			)}
            <GeoJSON
                // ref={groupRef}
                key={hash(country)}
                data={geo_config[country]}
                // data={countryJson}
                style={setColor}
                onEachFeature={(feature, layer) => handleFeature(feature, layer)}
            />
        </MapContainer>
    );
};

export default GameMap;
