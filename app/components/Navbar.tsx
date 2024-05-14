"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TiFlowSwitch } from "react-icons/ti";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const pathname = usePathname();
  return (
    <nav className="flex space-x-6 border-b px-5 h-16 items-center">
      <Link href="/">
        <TiFlowSwitch size={36} className="text-emerald-500" />
      </Link>
      <ul className="flex gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href ? "text-zinc-900" : "text-zinc-500"
              } hover:text-slate-800 transtion-all font-medium`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
