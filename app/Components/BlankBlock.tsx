const BlankBlock = ({ width }: { width: string }) => (
  <div
    className="h-[1.1em] my-0.5 bg-current rounded opacity-30 animate-pulse"
    style={{ width: width }}
  />
);

export default BlankBlock;
