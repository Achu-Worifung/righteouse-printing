"use client";
import { Menu, X, Handbag, UserRound } from "lucide-react";
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
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="w-full relative">
      <nav className="font-light text-xl drop-shadow-2xl w-full flex justify-between items-center py-2 bg-white/10 backdrop-blur-3xl">
        <div className="flex flex-col gap-1 md:w-auto w-full">
          <div className="flex  justify-between items-center flex-row px-4 md:w-auto w-full">
            <Logo />
            <div className="flex items-center gap-4">
                <Handbag size={32} />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {" "}
                    <UserRound size={34} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {isAuthenticated ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Orders</DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                          Sign Out
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem>Sign In</DropdownMenuItem>
                        <DropdownMenuItem>Sign Out</DropdownMenuItem>
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
              <div className="w-full flex flex-col text-lg font-light backdrop-blur-3xl text-start items-start  rounded-lg gap-4 md:hidden px-4 py-4 -webkit-text-stroke:1px_black text-black  ">
                <Link href="" onClick={() => setIsMenuOpen(false)} className="">
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
        <div className="hidden md:flex gap-4 md:gap-12 stroke-black [&_span]:[-webkit-text-stroke:1px_black]">
          <span className="">Home</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span>Shop</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>T-Shirts</DropdownMenuItem>
              <DropdownMenuItem>Hoodies</DropdownMenuItem>
              <DropdownMenuItem>Caps</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span>New Arrivals</span>
        </div>
        <div className="items-center gap-6 cursor-pointer hidden md:flex justify-center">
          <Handbag size={32} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <UserRound size={34} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isAuthenticated ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>Sign In</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
