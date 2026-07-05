import Sidebar from "../components/Sidebar";
import ReportForm from "../components/ReportForm";

function Report() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <ReportForm />
      </div>
    </div>
  );
}

export default Report;