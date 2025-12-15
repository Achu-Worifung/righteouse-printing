import { Logo } from "./ui/logo";
import { MoveLeft, MoveRight } from "lucide-react";

export function CallToAction() {
  return (
    <div className="w-full flex flex-col bg-amber-100 relative mt-10">
      <div className="absolute top-0 left-[50%] -translate-x-1/2 -translate-y-1/2 w-fit z-10 max-h-[60px] box-border">
        <span className="text-lg font-light flex items-center text-black gap-4">
          <MoveRight className="" />
          <div className="flex items-center gap-2 border-2 border-black px-4 py-1 bg-white rounded-sm">
            <Logo />
            <p>RHPrintDesigns</p>
          </div>
          <MoveLeft className="" />
        </span>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <span className="text-center ">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance uppercase">
            Be Unique
          </h1>
          <p className="leading-7 text-center  text-lg my-4 text-balance">
            Your style, Your fit. Make a statement with our one-of-a-kind
            pieces.
          </p>
          <div className="relative inline-flex items-center justify-center gap-4 group">
            <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            <a
              role="button"
              className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              href="#"
            >
              Create Your Own Design
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              >
                <path
                  d="M0 5h7"
                  className="transition opacity-0 group-hover:opacity-100"
                ></path>
                <path
                  d="M1 1l4 4-4 4"
                  className="transition group-hover:translate-x-[3px]"
                ></path>
              </svg>
            </a>
          </div>
        </span>
        <img src={"/childofgod.png"} className="aspect-auto w-1/2" />
      </div>
    </div>
  );
}
