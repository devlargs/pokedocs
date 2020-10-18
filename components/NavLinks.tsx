import Link from "next/link";

const NavLinks = () => (
  <>
    <Link href="/">
      <a className="my-1 text-sm .text-gray-200 leading-5 hover:text-blue-100 hover:underline md:mx-4 md:my-0">
        Home
      </a>
    </Link>
    <Link href="/pokemons">
      <a className="my-1 text-sm .text-gray-200 leading-5 hover:text-blue-100 hover:underline md:mx-4 md:my-0">
        Pokemon
      </a>
    </Link>
    <Link href="/utilities">
      <a className="my-1 text-sm .text-gray-200 leading-5 hover:text-blue-100 hover:underline md:mx-4 md:my-0">
        Utilities
      </a>
    </Link>
    <Link href="/about">
      <a className="my-1 text-sm .text-gray-200 leading-5 hover:text-blue-100 hover:underline md:mx-4 md:my-0">
        About Us
      </a>
    </Link>
    <Link href="/blogs">
      <a className="my-1 text-sm .text-gray-200 leading-5 hover:text-blue-100 hover:underline md:mx-4 md:my-0">
        Blogs
      </a>
    </Link>
    <Link href="/sadfasdfdasf">
      <a className="my-1 text-sm .text-gray-200 leading-5 hover:text-blue-100 hover:underline md:mx-4 md:my-0">
        Error Page
      </a>
    </Link>
  </>
);

export default NavLinks;
