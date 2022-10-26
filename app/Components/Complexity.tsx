const Complexity: React.FC<{ children: number }> = ({ children }) => {
  const normVal = Math.min(children, 15);
  const red = (normVal / 15) * 255;
  const green = Math.max(((15 - normVal) / 15) * 255, 0);
  const blue = Math.max(-((normVal - 7) * (normVal - 7)) * 100 + 255, 0);

  const rgbValue = `rgb(${red}, ${green},${blue})`;

  return (
    <div
      className={[
        "relative flex-1 shadow-lg rounded overflow-hidden flex items-center justify-center",
        "bg-white dark:bg-neutral-800 text-black dark:text-white font-semibold",
      ].join(" ")}
    >
      <div
        className="absolute top-0 left-0 h-full opacity-70 dark:opacity-100"
        style={{
          backgroundColor: rgbValue,
          width: (children / 15) * 100 + "%",
        }}
      ></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Complexity;
