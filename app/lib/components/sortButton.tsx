import { Form, useLocation } from "@remix-run/react";

const SortButton: React.FC<{
  name: string;
  value: string;
  children: React.ReactNode;
}> = ({ name, value, children }) => {
  const query = new URLSearchParams(useLocation().search);
  return (
    <Form method="get">
      <input type="hidden" name={name} value={value} />
      {query.get(name) == value && !query.has("reverse") ? (
        <input type={"hidden"} name="reverse" />
      ) : (
        ""
      )}
      <button
        className="[font:inherit] flex w-full justify-between"
        type="submit"
      >
        {children}
        <div>
          {query.get(name) !== value ? (
            "-"
          ) : query.has("reverse") ? (
            <>&uarr;</>
          ) : (
            <>&darr;</>
          )}
        </div>
      </button>
    </Form>
  );
};

export default SortButton;
