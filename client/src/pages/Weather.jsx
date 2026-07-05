import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";

function Weather() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <WeatherCard />
      </div>
    </div>
  );
}

export default Weather;