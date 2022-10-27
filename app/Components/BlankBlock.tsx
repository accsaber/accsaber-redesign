const BlankBlock = ({ width }: { width: string }) => (
  <div
    className="h-4 my-1 bg-current rounded opacity-30 animate-pulse"
    style={{ width: width }}
  />
);

export default BlankBlock;
