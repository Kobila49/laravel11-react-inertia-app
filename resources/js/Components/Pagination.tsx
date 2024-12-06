import {Link} from "@inertiajs/react";

export default function Pagination({links}: { links: { url: string; label: string; active: boolean }[] }) {

  return (
    <nav className="text-center mt-4">
      {links.map((link: { url: string; label: string; active: boolean }) => (
        <Link
          preserveScroll
          href={link.url}
          key={link.label}
          className={
            "inline-block px-3 py-2 rounded-lg text-xs text-gray-200" +
            (link.active ? " bg-gray-950 " : " ") +
            (!link.url ? " !text-gray-500 cursor-not-allowed " : " hover:bg-gray-950 ")
          }
          dangerouslySetInnerHTML={{__html: link.label}}></Link>
      ))}
    </nav>
  );
}
