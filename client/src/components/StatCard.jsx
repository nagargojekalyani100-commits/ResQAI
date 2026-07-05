function StatCard({ title, value, color }) {
  return (
    <div className={`${color} text-white rounded-xl p-6 shadow-lg`}>
      <h2 className="text-lg">{title}</h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;