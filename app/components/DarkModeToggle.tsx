import { useContext } from "react";
import DarkModeContext from "./DarkModeContext";
import { Form } from "@remix-run/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkToggle = () => {
  const { dark, setDarkMode } = useContext(DarkModeContext);
  return (
    <Form
      action="/settings/theme"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        setDarkMode(!dark);
        const fd = new FormData();
        fd.set("theme", dark ? "light" : "dark");
        fetch("/settings/theme", {
          method: "POST",
          body: fd,
        });
      }}
    >
      <button
        type="submit"
        className="p-3 headerNav"
        name="theme"
        value={dark ? "light" : "dark"}
        title={`${dark ? "Light" : "Dark"} mode`}
        aria-label={`${dark ? "Light" : "Dark"} mode`}
      >
        {dark ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    </Form>
  );
};

export default DarkToggle;
