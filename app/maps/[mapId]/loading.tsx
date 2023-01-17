import BlankBlock from "~/app/Components/BlankBlock";
import { MapHeaderFallback } from "../Components/MapHeader";

const MapLoadingPage = () => {
  return (
    <>
      <MapHeaderFallback />
      <div className="max-w-full mx-auto overflow-auto prose md:max-w-screen-lg dark:prose-invert whitespace-nowrap">
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
    </>
  );
};

export default MapLoadingPage;
