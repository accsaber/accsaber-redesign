import { Form, useTransition } from "@remix-run/react";
import LoadingSpinner from "./LoadingSpinner";

const GQLSortButton = ({
  values,
  currentValue,
  children,
}: {
  children: React.ReactNode;
  values: string[];
  currentValue?: string;
}) => {
  const value = currentValue ? values.indexOf(currentValue) ?? 0 : 0;
  const transition = useTransition();

  const transitionParams =
    transition && new URLSearchParams(transition.location?.search);

  const inputValue = values[(value + 1) % values.length] ?? values[0];

  const icon =
    currentValue && !values.includes(currentValue) ? (
      "-"
    ) : currentValue?.endsWith("Desc") ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    );

  return (
    <Form method="get" replace>
      <input type="hidden" name={"sortBy"} value={inputValue} />
      <button
        className="[font:inherit] flex w-full justify-between"
        type="submit"
      >
        {children}
        <div>
          {transitionParams?.get("sortBy") == inputValue ? (
            <LoadingSpinner className="h-6" />
          ) : (
            icon
          )}
        </div>
      </button>
    </Form>
  );
};

export default GQLSortButton;
