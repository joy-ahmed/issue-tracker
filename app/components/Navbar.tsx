"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFire } from "react-icons/fa6";
import { useSession } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoIosPower } from "react-icons/io";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { data: session, status } = useSession()
  const pathname = usePathname();
  return (
    <nav className="flex border-b px-16 h-16 items-center justify-between mb-5">
      <div className="flex items-center space-x-8">
      <Link href="/">
      <FaFire size={36} fill="#10B981" />
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
      </div>
      <div className="">
        { status === 'authenticated' && (
        // <Link href="/api/auth/signout">Sign out</Link>
        <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Avatar>
            <AvatarImage src={session?.user?.image!} />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/api/auth/signout" className="flex items-center gap-2">
            <IoIosPower size={20} />
            Sign out
            </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        )}
        { status === 'unauthenticated' && <Link href="/api/auth/signin">Sign in</Link> }
      </div>
    </nav>
  );
};

export default Navbar;
