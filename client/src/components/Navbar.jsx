function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🌍 ResQAI</h1>

      <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;