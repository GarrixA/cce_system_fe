const StatCard = ({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  color: string;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
      <Icon className={`${color} text-4xl`} />
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xl md:text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
