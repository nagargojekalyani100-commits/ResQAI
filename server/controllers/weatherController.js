const axios = require("axios");

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);

    res.status(200).json({
      success: true,
      weather: {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        condition: response.data.weather[0].main,
        description: response.data.weather[0].description,
        windSpeed: response.data.wind.speed,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Weather not found",
    });
  }
};