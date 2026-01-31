'use client';
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
export function Faq() {
    const faq = [
        {
        question: "What products do you offer?",
        answer:
          "We offer custom printed apparel including t-shirts, hoodies, sweatshirts, and caps. All products can be personalized with your designs.",
      },
      {
        question: "How do I place an order?",
        answer:
          "Simply browse our shop, select your desired products, customize them with your design, choose your size and quantity, then proceed to checkout.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, and secure online payment methods. All transactions are encrypted for your security.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery.",
      },
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unworn, unwashed items in original condition. Custom printed items may have different return conditions. Please contact us for details.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status from your account dashboard.",
      },
      {
        question: "Do you offer bulk or wholesale pricing?",
        answer:
          "Yes, we offer special pricing for bulk orders. Please contact us directly with your requirements for a custom quote.",
      },
      
    ]
  return (
    <div className="flex flex-col items-center justify-center px-3 py-8">
      <motion.span>
        <p className=" relative font-serif text-3xl md:text-5xl text-forest mb-6 tracking-tighter text-center">
          Frequently Asked Questions
        </p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10"
        >
          Here you will find answers to the most common questions about our
          services. <br />
          If you have any other inquiries, feel free to contact us directly.
        </motion.p>
      </motion.span>
        <Accordion type="single" collapsible className="w-full max-w-4xl">
        {faq.map((item, index) => (
            <motion.div key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}>
            <AccordionItem key={index} value={`item-${index}`} className="mb-4 border-b">
                <AccordionTrigger className="cursor-pointer">
                {item.question}
                </AccordionTrigger>
                <AccordionContent>
                {item.answer}
                </AccordionContent>
            </AccordionItem>
            </motion.div>
        ))}
        </Accordion>
     
    </div>
  );
}
