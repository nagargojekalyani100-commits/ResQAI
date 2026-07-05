import Sidebar from "../components/Sidebar";
import VolunteerForm from "../components/VolunteerForm";

function Volunteer() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <VolunteerForm />
      </div>
    </div>
  );
}

export default Volunteer;