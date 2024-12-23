import React, { useState } from 'react';
import { Container, TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      alert('City not found or API error occurred');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <TextField
        label="Enter City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={fetchWeather} fullWidth>
        Get Weather
      </Button>
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : weatherData ? (
        <Card style={{ marginTop: '20px', textAlign: 'left' }}>
          <CardContent>
            <Typography variant="h5">City: {weatherData.name}</Typography>
            <Typography variant="h6">Country: {weatherData.sys.country}</Typography>
            <Typography variant="body1">Temperature: {weatherData.main.temp}°C</Typography>
            <Typography variant="body1">Feels Like: {weatherData.main.feels_like}°C</Typography>
            <Typography variant="body1">Min Temp: {weatherData.main.temp_min}°C</Typography>
            <Typography variant="body1">Max Temp: {weatherData.main.temp_max}°C</Typography>
            <Typography variant="body1">Humidity: {weatherData.main.humidity}%</Typography>
            <Typography variant="body1">Pressure: {weatherData.main.pressure} hPa</Typography>
            <Typography variant="body1">Wind Speed: {weatherData.wind.speed} m/s</Typography>
            <Typography variant="body1">Wind Direction: {weatherData.wind.deg}°</Typography>
            <Typography variant="body1">Cloudiness: {weatherData.clouds.all}%</Typography>
            <Typography variant="body1">Visibility: {weatherData.visibility} m</Typography>
            <Typography variant="body1">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
            <Typography variant="body1">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Typography>
            <Typography variant="body1">Timezone: {weatherData.timezone / 3600} hours from UTC</Typography>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <Typography variant="body1">Weather: {weatherData.weather[0].description}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </Container>
  );
};

export default App;
