import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <nav>
          <Link href={"/"}>Домой</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/eda"}>Eda</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
