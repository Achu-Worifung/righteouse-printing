"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const CreativeCards = () => {
  const cards = [
    {
      id: 1,
      title: "Fast Delivery",
      description:
        "From design to delivery, our streamlined production means your shirts arrive faster than industry averages.",
      icon: "/express-delivery.png",
    },
    {
      id: 2,
      title: "Secure Checkout",
      description:
        "Your payment and personal information are fully protected with industry-leading encryption.",
      // icon: "/secure.svg",
      icon: "/secure-payment.png",
    },
    {
      id: 3,
      title: "Satisfaction Guarantee",
      description:
        "If you're not absolutely happy with your order, we’ll reprint or refund it — no questions asked.",
      // icon: "/satisfaction.svg",
      icon: "/guarantee.png",
    },
    {
      id: 4,
      title: "Premium Quality",
      description:
        "Every shirt is crafted with top-tier materials and printing technology for vibrant, long-lasting designs.",
      icon: "/high-quality.png",
    },
  ];

  return (
    <div className="*:box-border font-['Epilogue'] text-[17px] leading-[30px] font-normal antialiased bg-offwhite my-10 px-2">
      <p className="relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-center">
        Shop With <span className="text-burgundy"> Confidence</span>
      </p>
      <p className="text-softGray col-span-full max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
        Built on trust, delivered with care.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="cursor-pointer p-4 h-full flex items-start gap-4 mb-4 flex-col relative bg-offwhite  shadow-lg group"
          >
            <div className="w-10 h-10 relative">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold font-serif text-forest tracking-tighter">
                {card.title}
              </p>
              <p className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-left">
                {card.description}
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
className="absolute top-4 right-4 text-5xl font-bold text-forest select-none group-hover:!opacity-100 group-hover:scale-110 group-hover:text-burgundy transition-all duration-300 ease-in-out"            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CreativeCards;
