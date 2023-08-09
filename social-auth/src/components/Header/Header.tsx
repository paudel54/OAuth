import { headerClasses } from "./headerClasses";
import { Link } from "react-router-dom";
const Header = () => {
  const { header } = headerClasses;
  return (
    <header className={header}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center w-full">
            <Link
              to="/"
              className="mr-2 px-4 py-3 bg-black text-white focus:outline-none font-medium rounded-lg text-sm"
            >
              Home
            </Link>
            <Link
              to="/auth"
              className="mr-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              Sign in
            </Link>
            <Link
              to="/profile"
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300"
            >
              <img
                src="https://xsgames.co/randomusers/assets/avatars/male/0.jpg"
                alt="Avatar"
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
