import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
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
          <ChevronDoubleLeftIcon className="w-5 h-5" />
        </button>

        <button
          type="submit"
          name="page"
          value={currentPage - 1}
          aria-label="Previous Page"
          className={buttonClass}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon className="w-5 h-5" />
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
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          name="page"
          value={pages}
          aria-label="Last Page"
          className={buttonClass}
          disabled={currentPage >= pages}
        >
          <ChevronDoubleRightIcon className="w-5 h-5" />
        </button>
      </div>
    </Form>
  );
};

export default Pagination;
