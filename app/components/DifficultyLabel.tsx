const DifficultyLabel: React.FC<{ children: string }> = ({ children }) => {
  const colours = new Map([
    ["easy", "bg-green-400 text-black"],
    ["normal", "bg-blue-600 text-white"],
    ["hard", "bg-orange-500 text-black"],
    ["expert", "bg-red-600 text-white"],
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
    <>
      <div
        className={`inline-block rounded-full w-4 h-4 align-middle ${
          colours.get(children.toLowerCase().trim()) ?? ""
        }`}
      />{" "}
      <div className="align-middle inline-block">
        {names.get(children.toLowerCase()) ?? children[0].toUpperCase()}
      </div>
    </>
  );
};

export default DifficultyLabel;
