const Footer = () => {
  return (
    <footer className="bg-blue-500">
      <ul className="flex items-center justify-between max-w-4xl p-4 mx-auto text-sm text-white md:p-8">
        <li>
          Created by{" "}
          <a href="https://bryant.io" target="_blank" className="font-bold">
            Nemuel Lim &
          </a>
          &nbsp;
          <a href="https://bryant.io" target="_blank" className="font-bold">
            Ralph Largo
          </a>
        </li>

        <li>
          <a
            href="https://github.com/devlargs/pokeloggia"
            target="_blank"
            className="font-bold"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
