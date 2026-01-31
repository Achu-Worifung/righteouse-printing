"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { filterOptions } from "@/lib/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Filters = {
  size: string[];
  color: string[];
  type: string[];
  rating: string[];
};

// Desktop Filter Component
export function ListingFilterDesktop({sizes, colors, type}: filterOptions) {
  const FILTER_CATEGORIES = [
    { id: 'size', label: 'Size', options: sizes || [] },
    { id: 'color', label: 'Color', options: colors || [] },
    { id: 'type', label: 'Type', options: type || [] },
    { id: 'rating', label: 'Rating', options: ['5 Stars', '4 Stars & Up', '3 Stars & Up', '2 Stars & Up'] },
  ];

  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    size: [],
    color: [],
    type: [],
    rating: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: Filters = {
      size: params.getAll("size"),
      color: params.getAll("color"),
      type: params.getAll("type"),
      rating: params.getAll("rating"),
    };
    setFilters(newFilters);
  }, []);

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const exists = prev[category].includes(value);
      const newFilters = {
        ...prev,
        [category]: exists
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      };

      // Update URL immediately
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([cat, values]) => {
        values.forEach(val => {
          params.append(cat, val);
        });
      });
      router.push(`/listing?${params.toString()}`);

      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      size: [],
      color: [],
      type: [],
      rating: [],
    });
    router.push('/listing');
  };

  return (
    <div className="p-4 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.id}>
            <h3 className="text-base font-medium mb-3">{category.label}</h3>
            <div className="flex flex-col gap-2">
              {category.options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters[category.id as keyof Filters].includes(option)}
                    onChange={() => toggleFilter(category.id as keyof Filters, option)}
                    className="h-4 w-4 rounded border-gray-300 accent-burgundy"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListingFilterMobile({sizes, colors, type}: filterOptions) {
    const   FILTER_CATEGORIES = [
    { id: 'size', label: 'Size', options: sizes || [] },
    { id: 'color', label: 'Color', options: colors || [] },
    { id: 'type', label: 'Type', options: type || [] },
     { id: 'rating', label: 'Rating', options: ['5 Stars', '4 Stars & Up', '3 Stars & Up', '2 Stars & Up', ] },
  ];
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const currentCategory = FILTER_CATEGORIES.find(cat => cat.id === activeCategory);
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
  size: [],
  color: [],
  type: [],
  rating: [],
});


  // Animation variants for the slide effect
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

const showItems = () => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([category, values]) => {
    values.forEach(value => {
      params.append(category, value);
    });
  });

  router.push(`/listing?${params.toString()}`);
};


  const toggleFilter = (category: keyof Filters, value: string) => {
  setFilters(prev => {
    const exists = prev[category].includes(value);

    return {
      ...prev,
      [category]: exists
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value],
    };
  });
};

useEffect(() => {
    //getting the filters from the url
    const params = new URLSearchParams(window.location.search);
    const newFilters: Filters = {
      size: params.getAll("size"),
      color: params.getAll("color"),
      type: params.getAll("type"),
      rating: params.getAll("rating"),
    };
    setFilters(newFilters);
    console.log("Initial Filters from URL:", newFilters);
}, []);


  return (
    <Sheet onOpenChange={() => setActiveCategory(null)}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-hidden">
        <div className="flex flex-col h-full relative">
          
          {/* HEADER */}
          <SheetHeader className="p-4 border-b flex flex-row items-center gap-2 space-y-0 h-16">
            <div className="w-10">
              {activeCategory && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveCategory(null)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
            </div>
            <SheetTitle className="flex-1 text-start mr-10">
              {activeCategory ? currentCategory?.label : "Filters"}
            </SheetTitle>
          </SheetHeader>

          {/* ANIMATED CONTENT AREA */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence initial={false} custom={activeCategory ? 1 : -1}>
              {!activeCategory ? (
                /* MAIN VIEW */
                <motion.div
                  key="main"
                  custom={-1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 divide-y bg-offwhite"
                >
                  {FILTER_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium">{cat.label}</span>
                      <div className="flex items-center text-muted-foreground">
                        <span className="text-sm mr-2 text-blue-600 font-normal">All</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </motion.div>
              ) : (
                /* SUB VIEW */
                <motion.div
                  key="sub"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 bg-offwhite p-4"
                >
                  <div className="flex flex-col gap-1">
                    {currentCategory?.options.map((option, idx) => (
                      <label 
                        key={idx} 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border-b last:border-0"
                      >
                        <span className="text-base">{option}</span>
                        <input 
                          checked={filters[activeCategory as keyof Filters].includes(option)}
                          onChange={() => toggleFilter(activeCategory as keyof Filters, option)}
                          type="checkbox" 
                          className="h-5 w-5 rounded-full border-gray-300 accent-black" 
                        />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t bg-offwhite z-10">
            <Button className="w-full h-12 text-lg rounded-full" onClick={showItems}>
              Show Items
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}