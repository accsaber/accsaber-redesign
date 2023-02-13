import DarkModeContext from "./DarkModeContext";

const DarkToggle = () => (
  <DarkModeContext.Consumer>
    {({ dark, setDarkMode }) => (
      <button
        type="submit"
        className="p-3 headerNav"
        title={`${dark ? "Light" : "Dark"} mode`}
        aria-label={`${dark ? "Light" : "Dark"} mode`}
        onClick={() => {
          const fd = new FormData();
          setDarkMode(!dark);
          fd.set("theme", dark ? "light" : "dark");
          fetch("/settings/theme", {
            method: "POST",
            body: fd,
          });
        }}
      >
        {dark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    )}
  </DarkModeContext.Consumer>
);

export default DarkToggle;
