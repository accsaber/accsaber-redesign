function Logo(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 26.458 26.458"
      {...props}
    >
      <defs>
        <linearGradient id="c">
          <stop offset="0" stopColor="#03ff03"></stop>
          <stop offset="1" stopColor="#00c500"></stop>
        </linearGradient>
        <linearGradient id="b">
          <stop offset="0" stopColor="red"></stop>
          <stop offset="1" stopColor="#bf0000"></stop>
        </linearGradient>
        <linearGradient id="a">
          <stop offset="0" stopColor="#3091ff"></stop>
          <stop offset="1" stopColor="#007dc5"></stop>
        </linearGradient>
        <linearGradient
          id="f"
          x1="13.269"
          x2="13.269"
          y1="12.386"
          y2="3.092"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#a"
        ></linearGradient>
        <linearGradient
          id="e"
          x1="12.542"
          x2="4.636"
          y1="13.8"
          y2="18.365"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#b"
        ></linearGradient>
        <linearGradient
          id="d"
          x1="13.926"
          x2="21.915"
          y1="13.75"
          y2="18.362"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#c"
        ></linearGradient>
      </defs>
      <path
        fill="#171717"
        stroke="#fff"
        strokeWidth="0.529"
        d="M13.229 24.718l-9.95-5.745V7.485l9.95-5.745 9.953 5.745v11.49z"
        paintOrder="stroke fill markers"
      ></path>
      <path
        fill="url(#d)"
        d="M21.971 8.999l-8.042 4.643v9.296l8.047-4.646v-3.065l-5.37 3.1v-3.121l5.36-3.095z"
        paintOrder="stroke fill markers"
      ></path>
      <path
        fill="url(#e)"
        d="M4.485 9.016l8.047 4.645v3.105l-5.37-3.1v3.082l5.38 3.106v3.088l-8.048-4.646z"
        paintOrder="stroke fill markers"
      ></path>
      <path
        fill="url(#f)"
        d="M13.209 3.139l-8.01 4.64 2.679 1.548L10.5 7.813l2.682 1.548-2.632 1.52 2.677 1.545 8.033-4.638zm1.363 2.333l2.67 1.54-2.679 1.547-2.67-1.541z"
        paintOrder="stroke fill markers"
      ></path>
    </svg>
  );
}

export default Logo;
