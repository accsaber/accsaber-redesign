import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Form, Link, useSearchParams } from "@remix-run/react";

const usePageURL = (page: number, params: URLSearchParams) => {
  const np = new URLSearchParams(params);

  np.set("page", page.toString());

  return `?${np}`;
};

const PageLink = (props: {
  page: number;
  currentPage: number;
  children: React.ReactNode | React.ReactNode[];
  label: string;
  disabled?: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const targetURL = usePageURL(props.page, searchParams);
  return !props.disabled ? (
    <Link
      to={targetURL}
      aria-label="Previous Page"
      className={buttonClass(false)}
      prefetch="intent"
    >
      {props.children}
    </Link>
  ) : (
    <div className={buttonClass(true)}>{props.children}</div>
  );
};

const buttonClass = (disabled: boolean) =>
  `bg-white dark:bg-neutral-800 p-2 rounded shadow text-inherit${
    disabled ? " opacity-50 shadow-none" : ""
  }`;
const Pagination: React.FC<{
  children?: never;
  currentPage: number;
  pages: number;
}> = ({ currentPage, pages }) => {
  return (
    <div className="flex items-center justify-between text-black dark:text-neutral-300">
      <div className="flex gap-2">
        <PageLink page={0} label="First Page" currentPage={currentPage}>
          <ChevronDoubleLeftIcon className="w-5 h-5" />
        </PageLink>
        <PageLink
          page={currentPage - 1}
          currentPage={currentPage}
          label="Previous Page"
          disabled={currentPage <= 0}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </PageLink>
      </div>
      <div className="">
        Page {currentPage} of {pages}
      </div>
      <div className="flex gap-2">
        <PageLink
          page={currentPage + 1}
          label="Next Page"
          currentPage={currentPage}
          disabled={currentPage >= pages}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </PageLink>
        <PageLink
          page={pages}
          label="Last Page"
          currentPage={currentPage}
          disabled={currentPage >= pages}
        >
          <ChevronDoubleRightIcon className="w-5 h-5" />
        </PageLink>
      </div>
    </div>
  );
};

export default Pagination;
