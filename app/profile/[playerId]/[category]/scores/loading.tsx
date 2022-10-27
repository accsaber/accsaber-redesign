import LoadingSpinner from "~/app/Components/LoadingSpinner";

const BlankBlock = ({ width }: { width: string }) => (
  <div
    className="h-4 my-1 bg-current rounded opacity-30 animate-pulse"
    style={{ width: width }}
  />
);

const ScoreLoadingPage = () => {
  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden prose dark:prose-invert">
      <table className="overflow-auto whitespace-nowrap">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {new Array(50).fill(0).map((_i, n) => (
            <tr key={n}>
              <td>
                <BlankBlock width={"1.5rem"} />
              </td>
              <td className="w-full">
                <BlankBlock
                  width={`${
                    (Math.abs(Math.sin(n * Math.sqrt(5)) * 50) % 50) + 50
                  }%`}
                />
              </td>
              <td>
                <BlankBlock width={"3rem"} />
              </td>
              <td>
                <BlankBlock width={`${(Math.sin(n) + 2) * 2}rem`} />
              </td>
              <td>
                <BlankBlock width={"3rem"} />
              </td>
              <td>
                <BlankBlock width={"2rem"} />
              </td>
              <td>
                <BlankBlock width={"3rem"} />
              </td>
              <td>
                <BlankBlock width={"4rem"} />
              </td>
              <td>
                <BlankBlock width={"3rem"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreLoadingPage;
