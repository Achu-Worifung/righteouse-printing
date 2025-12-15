"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterState {
  priceRange: [number, number];
  sortBy: string;
  gender: string[];
  productType: string[];
}

export function ListingFilter() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    sortBy: "newest",
    gender: [],
    productType: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    sort: true,
    gender: true,
    productType: true,
  });

  const genders = ["Unisex", "Male", "Female"];
  const productTypes = [
    "T-Shirts",
    "Long Sleeve Shirts",
    "Polo Shirts",
    "Graphic Tees",
    "Dress Shirts",
    "Casual Shirts",
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleGender = (g: string) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender.includes(g)
        ? prev.gender.filter((x) => x !== g)
        : [...prev.gender, g],
    }));
  };

  const toggleProductType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      productType: prev.productType.includes(type)
        ? prev.productType.filter((t) => t !== type)
        : [...prev.productType, type],
    }));
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    setFilters((prev) => ({
      ...prev,
      priceRange: newRange,
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100],
      sortBy: "newest",
      gender: [],
      productType: [],
    });
  };

  const activeFilterCount =
    filters.gender.length +
    filters.productType.length +
    (filters.sortBy !== "newest" ? 1 : 0);

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection("sort")}
          className="w-full flex items-center justify-between mb-4 hover:text-gray-700"
        >
          <h3 className="font-semibold text-gray-900">Sort By</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.sort ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.sort && (
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between mb-4 hover:text-gray-700"
        >
          <h3 className="font-semibold text-gray-900">Price Range</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600 block mb-2">Min</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600 block mb-2">Max</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded text-sm text-gray-700">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </div>
          </div>
        )}
      </div>





      {/* Gender */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection("gender")}
          className="w-full flex items-center justify-between mb-4 hover:text-gray-700"
        >
          <h3 className="font-semibold text-gray-900">Gender</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.gender ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.gender && (
          <div className="space-y-2">
            {genders.map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() => toggleGender(g)}
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                />
                <span className="text-sm text-gray-700">{g}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Type */}
      <div>
        <button
          onClick={() => toggleSection("productType")}
          className="w-full flex items-center justify-between mb-4 hover:text-gray-700"
        >
          <h3 className="font-semibold text-gray-900">Product Type</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedSections.productType ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.productType && (
          <div className="space-y-2">
            {productTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.productType.includes(type)}
                  onChange={() => toggleProductType(type)}
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}