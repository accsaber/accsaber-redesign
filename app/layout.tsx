import "../styles/globals.css";
import { AnalyticsWrapper } from "./Components/Analytics";
import Header from "./Components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className="dark:bg-neutral-900">
        <Header />
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
};

export default Layout;
