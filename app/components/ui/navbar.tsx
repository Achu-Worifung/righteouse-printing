
'use client';
import { Link, ShoppingCart , Menu , X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useState } from "react";
export function Navbar() {
      const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full">
          <nav className="font-bold text-xl drop-shadow-2xl w-full flex justify-between items-center p-4 bg-white/10 backdrop-blur-md px-8">
            <div className="flex relative justify-between w-full h-full items-center md:block md:w-fit">
              <Image src="/logo.svg" alt="logo" width={50} height={50} />
              {
                isMenuOpen ? (<X size={32} onClick={() => setIsMenuOpen(false)} className="md:hidden block ml-4 cursor-pointer rounded-full hover:bg-white/10"/> 
                ) : (
                <Menu size={32} onClick={() => setIsMenuOpen(true)} className="md:hidden block ml-4 cursor-pointer rounded-full hover:bg-white/10"/>
                )
              }
              {
                isMenuOpen && (
                  <div className="flex flex-col bg-white/10 backdrop-blur-md absolute top-20 left-4 right-4 p-4 rounded-lg gap-4 md:hidden box-content px-8 py-4">
                    <a href="" onClick={() => setIsMenuOpen(false)} className="">Products</a>
                    <a href="" onClick={() => setIsMenuOpen(false)} className="">Custom Design</a>
                    <a href="" onClick={() => setIsMenuOpen(false)} className="">Contact Us</a>
                  </div>
                )
              }
            </div>
            <div className="hidden md:block">
              <a href="">Products</a>
              <a href="">Custom Design</a>
              <a href="">Contact Us</a>
            </div>
            <div className=" items-center gap-4 cursor-pointer hidden md:flex">
              <ShoppingCart size={32} />
              <Link href="">Sign In</Link>
            </div>
          </nav>
        </header>
  );
}
