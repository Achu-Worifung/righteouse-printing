"use client";

import { useState } from "react";

export function TextToggle() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsSignUp((prev) => !prev)}
      className="
        relative w-[400px] h-10 
        flex items-center 
        bg-gray-200 border border-black rounded-sm
        overflow-hidden px-1 
      "
    >
      {/* Sliding highlight */}
      <span
        className={`
          absolute inset-y-0 w-1/2 bg-offwhite border border-black 
          transition-all duration-300 
          ${isSignUp ? "left-1/2" : "left-0"}
        `}
      />

      <span
        className={`
          flex-1 text-center z-10 transition-colors duration-300
          ${isSignUp ? "text-gray-500" : "text-black font-semibold"}
        `}
      >
        Sign In
      </span>

      <span
        className={`
          flex-1 text-center z-10 transition-colors duration-300
          ${!isSignUp ? "text-gray-500" : "text-black font-semibold"}
        `}
      >
        Sign Up
      </span>
    </button>
  );
}
