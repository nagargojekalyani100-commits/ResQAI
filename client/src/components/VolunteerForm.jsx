import { useEffect, useState } from "react";
import axios from "axios";

function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    skills: "",
    status: "Available",
  });

  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("https://resqai-azyw.onrender.com/api/volunteers");
      setVolunteers(res.data.volunteers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://resqai-azyw.onrender.com/api/volunteer",
        formData
      );

      alert("Volunteer Registered Successfully!");

      setFormData({
        name: "",
        phone: "",
        location: "",
        skills: "",
        status: "Available",
      });

      fetchVolunteers();
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  const deleteVolunteer = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;

    try {
      await axios.delete(
        `https://resqai-azyw.onrender.com/api/volunteer/${id}`
      );

      fetchVolunteers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          👥 Volunteer Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (Medical, Rescue...)"
            value={formData.skills}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Available</option>
            <option>Busy</option>
          </select>

          <button
            className="bg-blue-600 text-white rounded-lg"
          >
            Register Volunteer
          </button>

        </form>

      </div>

      <div className="bg-white mt-8 rounded-xl shadow-lg">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Location</th>
              <th className="p-3">Skills</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {volunteers.map((volunteer) => (

              <tr
                key={volunteer._id}
                className="border-b text-center"
              >
                <td className="p-3">{volunteer.name}</td>
                <td>{volunteer.phone}</td>
                <td>{volunteer.location}</td>
                <td>{volunteer.skills}</td>
                <td>{volunteer.status}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteVolunteer(volunteer._id)
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default VolunteerForm;