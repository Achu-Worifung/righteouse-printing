import React from "react";

const CreativeCards = () => {
  const cards = [
    {
      id: 1,
      title: "Core Planning",
      description:
        "Lorem ipsum dolor sit amet, consectne auctor aliquet. Aenean sollicitudi bibendum auctor.",
      icon: "https://i.ibb.co/fV0GzDqj/construction.png",
      link: "https://www.fiverr.com/s/8zElN2v",
    },
    {
      id: 2,
      title: "Traditional Designs",
      description:
        "Lorem ipsum dolor sit amet, consectne auctor aliquet. Aenean sollicitudi bibendum auctor.",
      icon: "https://i.ibb.co/KjGz3dmZ/skyline.png",
      link: "https://www.fiverr.com/s/8zElN2v",
    },
    {
      id: 3,
      title: "Quality Materials",
      description:
        "Lorem ipsum dolor sit amet, consectne auctor aliquet. Aenean sollicitudi bibendum auctor.",
      icon: "https://i.ibb.co/whkhVgQz/best-practice.png",
      link: "https://www.fiverr.com/s/8zElN2v",
    },
  ];

  return (
    <div className="*:box-border font-['Epilogue'] text-[17px] leading-[30px] font-normal antialiased bg-white !my-10">
      {/* Font Awesome Icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Dancing+Script:wght@400..700&display=swap"
        rel="stylesheet"
      />

      <section className="py-[120px] relative">
        <div className="max-w-[1320px] w-full px-3 mx-auto">
          <div className="flex flex-wrap -mx-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 md:mb-10 lg:mb-0"
              >
                <div className="relative group transition-all duration-300 ease-in-out w-4/5 lg:w-4/5 mx-auto">
                  {/* Skewed Background Effect */}
                  {/* this is the  problem  */}
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
