import { Truck, LockKeyhole  } from 'lucide-react';

const CreativeCards = () => {
  const cards = [
    {
      id: 1,
      title: "Fast Delivery",
      description:
        "From design to delivery, our streamlined production means your shirts arrive faster than industry averages.",
      icon: "/truck.svg",
      link: "https://www.fiverr.com/s/8zElN2v",
    },
    {
      id: 2,
      title: "Secure Checkout",
      description:
        "Your payment and personal information are fully protected with industry-leading encryption.",
      icon: "/secure.svg",
      link: "https://www.fiverr.com/s/8zElN2v",
    },
    {
      id: 3,
      title: "Satisfaction Guarantee",
      description:
        "If you're not absolutely happy with your order, we’ll reprint or refund it — no questions asked.",
      icon: "/satisfaction.svg",
      link: "https://www.fiverr.com/s/8zElN2v",
    },
  ];

  return (
    <div className="*:box-border font-['Epilogue'] text-[17px] leading-[30px] font-normal antialiased bg-white my-20!">
      {/* Font Awesome Icons */}
      <h1 
        className="uppercase text-5xl font-semibold w-full text-center letter-spacing tracking-wider"
        style={{
          textShadow: `
            1px -1px 0 #767676, 
            -1px 1px 1px #737272, 
            -2px 2px 1px #767474, 
            -3px 3px 1px #787777, 
            -4px 4px 1px #7b7a7a, 
            -5px 5px 1px #828181, 
            -6px 6px 1px #8b8a89, 
            -7px 7px 1px #949392, 
            -8px 8px 1px #9e9c9c, 
            -9px 9px 1px #a8a6a6, 
            -10px 10px 1px #b2b1b0, 
            -11px 11px 1px #bcbbba, 
            -12px 12px 1px #c6c4c4
          `
        }}
      >
        Shop with Confidence
      </h1>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Dancing+Script:wght@400..700&display=swap"
        rel="stylesheet"
      />

      <section className="py-[120px] relative my-20! w-full flex items-center justify-center">
        <div className="max-w-[1320px] w-full px-3 mx-auto">
          <div className="flex flex-wrap -mx-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 md:mb-10 lg:mb-0"
              >
                <div className="relative group transition-all duration-300 ease-in-out w-4/5 lg:w-4/5 mx-auto">
                  {/* Skewed Background Effect */}
                  <div className="absolute left-1/2 top-1/2 w-[190px] h-[380px] bg-[#f7f6f2]  transform -translate-x-1/2 -translate-y-1/2 -skew-x-[20deg] transition-all duration-300 ease-in-out group-hover:bg-[#fffab3] "></div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 text-center rounded-2xl">
                    {/* Icon Container */}
                    <div className="relative w-[140px] h-[150px] mx-auto flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-full h-full border border-[#ffee02] bg-white -skew-x-[20deg] transition-all duration-300 ease-in-out group-hover:bg-[#ffee02]"></div>
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="relative w-[70px] h-[70px]"
                      />
                    </div>

                    <h3 className="mb-4 mt-12 font-bold text-2xl lg:text-[1.75rem] leading-tight ">
                      <a
                        href={card.link}
                        className="text-black no-underline hover:underline "
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {card.title}
                      </a>
                    </h3>

                    <p className="text-[#444] mb-8 text-base leading-[30px] !bg-transparent">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeCards;
