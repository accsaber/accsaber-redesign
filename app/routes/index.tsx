import logo from "~/lib/images/logo.png";
import AccSaberNews from "~/lib/strings/home.md";

const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-l from-blue-600 to-purple-600 text-white">
        <div className="max-w-screen-lg mx-auto p-6 flex items-center text-3xl md:text-6xl gap-4 font-semibold">
          <img src={logo} alt="accsaber logo" className="aspect-square h-48" />
          <h1>Welcome to AccSaber!</h1>
        </div>
      </div>
      <div className="prose dark:prose-invert mx-auto p-8 max-w-screen-lg prose-lg">
        <AccSaberNews />
      </div>
    </>
  );
};

export default HomePage;
