import { useState } from "react";
import axios from "axios";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );

      setWeather(res.data.weather);
    } catch (error) {
      alert("City not found");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          🌦 Weather Information
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-3 rounded-lg flex-1"
          />

          <button
            onClick={getWeather}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Search
          </button>

        </div>

      </div>

      {weather && (

        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            📍 {weather.city}
          </h2>

          <div className="space-y-4 text-lg">

            <p>🌡 Temperature : {weather.temperature} °C</p>

            <p>☁ Condition : {weather.condition}</p>

            <p>📝 Description : {weather.description}</p>

            <p>💧 Humidity : {weather.humidity}%</p>

            <p>💨 Wind Speed : {weather.windSpeed} m/s</p>

          </div>

        </div>

      )}

    </div>
  );
}

export default WeatherCard;