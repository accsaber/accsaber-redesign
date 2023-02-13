import { Form, useSearchParams } from "@remix-run/react";

const buttonClass =
  "p-2 rounded shadow text-inherit disabled:opacity-50 disabled:shadow-none";
const Pagination: React.FC<{
  children?: never;
  currentPage: number;
  pages: number;
}> = ({ currentPage, pages }) => {
  const [searchParams] = useSearchParams();
  return (
    <Form
      className="flex items-center justify-between text-black dark:text-neutral-300"
      method="get"
    >
      {searchParams &&
        [...searchParams]
          .filter(([name]) => name !== "page")
          .map(([name, value]) => (
            <input
              type="hidden"
              key={`searchparams-#${name}-pagination`}
              name={name}
              value={value.toString()}
            />
          ))}
      <div className="flex gap-2">
        <button
          type="submit"
          name="page"
          value={1}
          aria-label="First Page"
          className={buttonClass}
          disabled={currentPage <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          type="submit"
          name="page"
          value={currentPage - 1}
          aria-label="Previous Page"
          className={buttonClass}
          disabled={currentPage <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="">
        Page {currentPage} of {pages}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          name="page"
          value={currentPage + 1}
          aria-label="Next Page"
          className={buttonClass}
          disabled={currentPage >= pages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="submit"
          name="page"
          value={pages}
          aria-label="Last Page"
          className={buttonClass}
          disabled={currentPage >= pages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Form>
  );
};

export default Pagination;
