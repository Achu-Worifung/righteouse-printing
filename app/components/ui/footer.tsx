import Image from "next/image";

export function Footer() {
  const socialMedia = ["pinterest", "x", "facebook", "instagram"];
  return (
    <footer className="bg-[#151414] text-white box-border py-6 md:px-40 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 max-w-7xl mx-auto  py-10">
        {/* the main content */}
        <div className="w-full ">
          <Image
            height={34}
            width={34}
            src={"/logo.svg"}
            className="bg-transparent w-24 h-24"
            alt="logo"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam qui
            eligendi ex inventore maiores, cupiditate, provident necessitatibus
            illum, incidunt dolores sunt sapiente quos laborum beatae officiis
            cumque explicabo. Illo, commodi?
          </p>
        </div>
        <section className="grid grid-cols-2 gap-2 justify-between">
          <div className="flex-1 w-full">
            <h3 className="text-xl font-bold">Our Online Store</h3>
            <hr className="w-1/2 h-1 border-0 bg-red-600 my-3" />
            <ul className="mt-2 space-y-2 text-white/70">
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                Etsy
              </li>
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                Shopify
              </li>
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                Amazon
              </li>
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                WooCommerce
              </li>
            </ul>
          </div>

          <div className="flex-1 w-full">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <hr className="w-1/2 h-1 border-0 bg-red-600 my-3" />
            <ul className="mt-2 space-y-2 text-white/70">
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                Home
              </li>
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                About
              </li>
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                Services
              </li>
              <li
                className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
                style={{ cursor: "pointer", margin: "15px 0 15px 0" }}
              >
                Contact
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="w-full border-t border-white/10 py-4 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-md text-white/70">Socials</span>
          <ul className="flex md:justify-end gap-4 mt-3 md:mt-0">
            {socialMedia.map((item, index) => (
              <li key={index}>
                <a href="#" aria-label={item} className="inline-flex">
                  <Image
                    height={24}
                    width={24}
                    src={`/${item}.svg`}
                    alt={`${item} icon`}
                    className="w-6 h-6"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <span>
          <p className="text-center text-sm text-white/50 mt-4">
            &copy; {new Date().getFullYear()} RighteousHouse Printing. All
            rights reserved.
          </p>
        </span>
      </div>
    </footer>
  );
}
