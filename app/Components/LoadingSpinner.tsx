const LoadingSpinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    stroke="currentColor"
    viewBox="0 0 38 38"
    className="animate-spin"
  >
    <g
      fill="none"
      fillRule="evenodd"
      strokeWidth="2"
      transform="translate(1 1)"
    >
      <circle cx="18" cy="18" r="18" strokeOpacity="0.25"></circle>
      <path d="M36 18c0-9.94-8.06-18-18-18"></path>
    </g>
  </svg>
);

export default LoadingSpinner;
