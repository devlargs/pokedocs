import Link from "next/link";
import NavLinks from "components/NavLinks";
import { GITHUB_LINK } from "constants/links";

const Header = () => (
  <header className="shadow bg-red-600 text-white">
    <nav className="container mx-auto px-6 py-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-white text-xl font-bold md:text-2xl hover:.text-gray-200">
                pokédocs
              </a>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="md:flex items-center block">
          <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
            <NavLinks />

            <a
              href={GITHUB_LINK}
              className="btn btn-sm btn-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="h-6 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.026 2c-5.509.0-9.974 4.465-9.974 9.974.0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481.0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93.0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64.0.0.837-.269 2.742 1.021.798-.221 1.649-.332 2.496-.336.849.004 1.701.115 2.496.336 1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675.0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846.0 1.334-.012 2.41-.012 2.737.0.267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
