export function Footer() {
  const socialMedia = ["pinterest", "x", "facebook", "instagram"];
  return (
    <footer className="bg-[#151414] text-white box-border pt-6" 
    
  >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-40 md:px-8 py-10"
      style={{
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "24px",
        maxWidth: "1280px",
        margin: "auto",
        padding: "32px 32px",}}>
        {/* the main content */}
        <div>
          <img src={"/logo.svg"} className="bg-transparent w-24 h-24" alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam qui
            eligendi ex inventore maiores, cupiditate, provident necessitatibus
            illum, incidunt dolores sunt sapiente quos laborum beatae officiis
            cumque explicabo. Illo, commodi?
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold">Our Online Store</h3>
          <hr className="w-1/2 h-1 border-0 bg-red-600 my-3" />
          <ul className="mt-2 space-y-2 text-white/70">
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>
                Etsy</li>
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>
                Shopify</li>
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>Amazon</li>
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>WooCommerce</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold">Quick Links</h3>
          <hr className="w-1/2 h-1 border-0 bg-red-600 my-3" />
          <ul className="mt-2 space-y-2 text-white/70">
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>Home</li>
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>About</li>
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>Services</li>
            <li className="text-sm font-medium hover:text-white hover:underline hover:underline-offset-2 transition duration-300"
            style={{ cursor: "pointer", margin:"15px 0 15px 0" }}>Contact</li>
          </ul>
        </div>
      </div>

      <div className="w-full border-t border-white/10 pt-4" style={{paddingTop:'10px'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl mx-auto px-4 md:px-8 py-4" style={{
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        maxWidth: "1280px",
        margin: "auto",
        padding: "15px 32px",}}>
          <span className="text-sm text-white/70">© 2023 My Company. All rights reserved.</span>
          <ul className="flex md:justify-end gap-4 mt-3 md:mt-0">
            {socialMedia.map((item, index) => (
              <li key={index}>
                <a href="#" aria-label={item} className="inline-flex">
                  <img src={`/${item}.svg`} alt={`${item} icon`} className="w-6 h-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
