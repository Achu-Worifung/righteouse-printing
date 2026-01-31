"use client";
import { Menu, X, Handbag, UserRound, ChevronDown  } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@radix-ui/react-dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full relative bg-burgundy">
      <nav className="font-light text-xl drop-shadow-2xl w-full flex justify-between items-center py-2 bg-white/10 backdrop-blur-3xl px-2 md:px-8 lg:px-16">
        <div className="flex flex-col gap-1 md:w-auto w-full">
          <div className="flex text-offwhite justify-between items-center flex-row px-4 md:w-auto w-full">
            <Logo className="relative left-0 p-0" />
            <div className="md:hidden flex items-center gap-4">
              <Link href={"/cart"}> <Handbag size={32} /></Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <UserRound size={34} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-light text-xl">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="font-light text-xl">My Account</DropdownMenuItem>
                      <DropdownMenuItem className="font-light text-xl">Orders</DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="font-light text-xl">
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem className="font-light text-xl">
                        <Link href="/signin">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-light text-xl">
                        <Link href="/signup" className="text-xl font-light">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {isMenuOpen ? (
                <X
                  size={32}
                  onClick={() => setIsMenuOpen(false)}
                  className="md:hidden block ml-4 cursor-pointer rounded-full hover:bg-white/10"
                />
              ) : (
                <Menu
                  size={32}
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden block ml-4 cursor-pointer rounded-full hover:bg-white/10"
                />
              )}
            </div>

          </div>
          {isMenuOpen && (
            <div className="text-offwhite w-full flex flex-col text-lg font-light  text-start items-start   gap-3 md:hidden px-4 py-4 -webkit-text-stroke:1px_black bg-transparent ">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-offwhite">
                Home
                <Separator />
              </Link>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full text-xl font-light">
                    Shop
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2 mt-2 ml-4 text-xl font-light">
                    <Link href="/listing">All</Link>
                    <Link href="/listing?category=tshirts">T-Shirts</Link>
                    <Link href="/listing?category=hoodies">Hoodies</Link>
                    <Link href="/listing?category=caps">Caps</Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Link href="" onClick={() => setIsMenuOpen(false)} className="">
                New Arrivals
                <Separator />
              </Link>
            </div>
          )}
        </div>
        <div className="font-serif text-offwhite hidden md:flex gap-4 md:gap-12 stroke-black [&_span]:[-webkit-text-stroke:1px_black]">
          <Link href="/" className="">Home</Link>
          <DropdownMenu >
            <DropdownMenuTrigger>
              <p className="text-xl font-light cursor-pointer">Shop</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-2xs border-none text-white outline-0">
              <DropdownMenuItem className="hover:bg-burgundy/20">
                <Link href="/listing" className="text-2xl font-light">All</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-burgundy/20"><Link href="/listing?category=tshirts" className="text-2xl font-light">T-Shirts</Link></DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-burgundy/20"><Link href="/listing?category=hoodies" className="text-2xl font-light">Hoodies</Link></DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-burgundy/20"><Link href="/listing?category=caps" className="text-2xl font-light">Caps</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/new-arrivals" className="text-2xl font-light">New Arrivals</Link>
        </div>
        <div className="text-offwhite  items-center gap-6 cursor-pointer hidden md:flex justify-center">
          <Link href={"/cart"}> <Handbag size={32} /></Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <UserRound size={34} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isAuthenticated ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-light text-xl">My Account</DropdownMenuItem>
                  <DropdownMenuItem className="font-light text-xl">Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="font-light text-xl">Sign Out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="font-light text-xl">
                    <Link href="/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-light text-xl">
                    <Link href="/signup" className="text-xl font-light">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
