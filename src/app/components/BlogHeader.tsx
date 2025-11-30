import Link from "next/link";
import Logo from "./Logo";

interface BlogHeaderProps {
  title?: string; // optional title for single post page
}

export default function BlogHeader({ title }: BlogHeaderProps) {
  return (
    <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center px-1 py-2 mb-4">
      <div className="flex items-center gap-4">
        <Logo />
        {title && (
          <h1 className="text-lg font-bold md:text-xl">{title}</h1>
        )}
      </div>
      <nav className="mt-2 md:mt-0">
        <ul className="flex items-center text-xs font-medium gap-2">
          <li className="hover:text-pink-400 transition duration-300">
            <Link href="/">HOME</Link>
          </li>
          <li className="hover:text-pink-400 transition duration-300">
            <Link href="/blogs">BLOGS</Link>
          </li>
          <li className="hover:text-pink-400 transition duration-300">
            <Link href="/#contact">HIRE ME</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
