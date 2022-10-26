import "../styles/globals.css";
import Header from "./Components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>AccSaber</title>
      </head>
      <body className="dark:bg-neutral-900">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default Layout;
