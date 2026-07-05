import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Reports"
              value="25"
              color="bg-blue-600"
            />

            <StatCard
              title="Volunteers"
              value="60"
              color="bg-green-600"
            />

            <StatCard
              title="Rescued"
              value="110"
              color="bg-yellow-500"
            />

            <StatCard
              title="Pending"
              value="12"
              color="bg-red-600"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;