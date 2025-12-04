import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-100 to-slate-200 shadow-md px-6 md:px-8 py-3 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-3 no-underline text-slate-900"
      >
        <Image
          src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-02.svg"
          alt="Jerusalem Heritage Realty logo"
          width={90}
          height={90}
          className="h-9 w-auto md:h-13"
          priority
        />
        <span className="text-[20px] md:text-[22px] font-bold tracking-[0.18em] uppercase">
          Jerusalem Heritage Realty
        </span>
      </Link>

      <div className="flex gap-6 text-[17px] font-medium">
        <Link
          href="/properties"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          Properties
        </Link>
        <Link
          href="/projects"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/about"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
