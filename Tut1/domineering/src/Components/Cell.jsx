const size = 10;

export default function Cell({ value, onClick }) {
  const colors = {
    0: 'bg-white',
    1: 'bg-blue-400',
    2: 'bg-red-400',
  };

  return (
    <div
      onClick={onClick}
      className={`w-10 h-10 border border-gray-400 ${colors[value]} cursor-pointer hover:opacity-70`}
    />
  );
}
