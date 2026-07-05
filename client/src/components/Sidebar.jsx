import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Menu</h2>

      <ul className="space-y-4">

        <li>
          <Link
            to="/dashboard"
            className="hover:text-blue-400 block"
          >
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/report"
            className="hover:text-blue-400 block"
          >
            📢 Report Disaster
          </Link>
        </li>
        <li>
  <Link
    to="/volunteer"
    className="hover:text-blue-400 block"
  >
    👥 Volunteers
  </Link>
</li>

        <li>
          <Link
            to="/admin"
            className="hover:text-blue-400 block"
          >
            👨‍💼 Admin
          </Link>
        </li>

        <li>
          <Link
            to="/map"
            className="hover:text-blue-400 block"
          >
            🗺 Disaster Map
          </Link>
        </li>
  <li>
  <Link
    to="/weather"
    className="hover:text-blue-400 block"
  >
    🌦 Weather
  </Link>
</li>
        <li>
  <Link
    to="/analytics"
    className="hover:text-blue-400 block"
  >
    📊 Analytics
  </Link>
</li>
        <li>
          <a
            href="#"
            className="hover:text-blue-400 block"
          >
            ⚙ Settings
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;