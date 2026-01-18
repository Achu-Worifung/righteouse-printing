import { Logo } from "./ui/logo";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function CallToAction() {
  return (
    <div className="w-full bg-white relative py-16 md:py-24 mt-10 overflow-hidden">
      {/* Minimalistic background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#570009]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#570009]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Brand tag */}
            <div className="w-fit">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#570009] uppercase tracking-widest border-b-2 border-[#570009] pb-1">
                <div className="w-2 h-2 bg-[#570009] rounded-full"></div>
                RHPrintDesigns
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Be <span className="text-[#570009]">Unique</span>
              </h1>
              <div className="h-1 w-16 bg-[#570009] mt-4"></div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Your style, your fit. Express yourself with one-of-a-kind pieces designed to make a statement.
            </p>

            {/* CTA Button */}
            <div>
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#570009] text-white font-semibold rounded-lg hover:bg-[#7a020e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Create Your Design
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats or social proof */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-500">Designs Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9★</p>
                <p className="text-sm text-gray-500">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              {/* Subtle background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#570009]/10 to-transparent rounded-3xl transform -rotate-3"></div>
              
              <Image 
                width={500} 
                height={500} 
                src={"/childofgod.png"} 
                alt="Unique Design" 
                className="w-full h-auto rounded-2xl object-cover relative z-10 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
