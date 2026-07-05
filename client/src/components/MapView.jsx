import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ reports }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India
      zoom={5}
      className="h-[650px] w-full rounded-xl shadow-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => (
        <Marker
          key={report._id}
          position={[
            report.latitude || 20.5937,
            report.longitude || 78.9629,
          ]}
        >
          <Popup>
            <div className="space-y-2">
              <h2 className="font-bold text-blue-600">
                {report.disasterType}
              </h2>

              <p>
                <strong>Location:</strong> {report.location}
              </p>

              <p>
                <strong>People:</strong> {report.peopleAffected}
              </p>

              <p>
                <strong>Description:</strong> {report.description}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;