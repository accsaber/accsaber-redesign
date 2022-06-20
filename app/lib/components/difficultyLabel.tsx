const DifficultyLabel: React.FC<{ children: string }> = ({ children }) => {
  const colours = new Map([
    ["easy", "bg-green-300 text-black"],
    ["normal", "bg-blue-600 text-white"],
    ["hard", "bg-orange-500 text-white"],
    ["expert", "bg-red-500 text-white"],
    ["expertplus", "bg-purple-600 text-white"],
  ]);
  const names = new Map([
    ["easy", "Easy"],
    ["normal", "Normal"],
    ["hard", "Hard"],
    ["expert", "Expert"],
    ["expertplus", "Expert+"],
  ]);
  return (
    <div
      className={`inline-block rounded px-1 [text-decoration:none] ${
        colours.get(children.toLowerCase().trim()) ?? ""
      }`}
    >
      {names.get(children.toLowerCase()) ?? children[0].toUpperCase()}
    </div>
  );
};

export default DifficultyLabel;
