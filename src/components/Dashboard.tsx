import React from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const fetchWorldwideData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    return response.json();
};

const fetchCountryData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    return response.json();
};

const fetchGraphData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
    return response.json();
};

function Dashboard() {
    const { data: worldwideData } = useQuery('worldwideData', fetchWorldwideData);
    const { data: countryData } = useQuery('countryData', fetchCountryData);
    const { data: graphData } = useQuery('graphData', fetchGraphData);

    // Data for Line Graph
    const lineData = {
        labels: graphData ? Object.keys(graphData.cases) : [],
        datasets: [
            {
                label: 'Cases',
                data: graphData ? Object.values(graphData.cases) : [],
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Deaths',
                data: graphData ? Object.values(graphData.deaths) : [],
                borderColor: 'red',
                fill: false,
            },
            {
                label: 'Recovered',
                data: graphData ? Object.values(graphData.recovered) : [],
                borderColor: 'green',
                fill: false,
            },
        ],
    };

    // Leaflet map markers
    const markers = countryData
        ? countryData.map((country: any) => ({
              position: [country.countryInfo.lat, country.countryInfo.long],
              popupContent: (
                  <div>
                      <h3>{country.country}</h3>
                      <p>Active: {country.active}</p>
                      <p>Cases: {country.cases}</p>
                      <p>Deaths: {country.deaths}</p>
                      <p>Recovered: {country.recovered}</p>
                  </div>
              ),
          }))
        : [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Worldwide Statistics</h2>
                <div className="p-4 border rounded">
                    <p>Cases: {worldwideData?.cases}</p>
                    <p>Deaths: {worldwideData?.deaths}</p>
                    <p>Recovered: {worldwideData?.recovered}</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Line Graph</h2>
                <div className="p-4 border rounded">
                    <Line data={lineData} />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Map with Markers</h2>
                <div className="p-4 border rounded">
                    <MapContainer
                        center={[20, 0]}
                        zoom={2}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {markers.map((marker: { position: [number, number]; popupContent: JSX.Element }, index: number) => (

    <Marker
        key={index}
        position={marker.position}
        icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
        })}
    >
        <Popup>{marker.popupContent}</Popup>
    </Marker>
))}

                           
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
