"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface FilterState {
  priceRange: [number, number];
  sortBy: string;
  gender: string[];
  productType: string[];
}

interface ListingSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const GENDERS = ["Men", "Women", "Unisex"];
const PRODUCT_TYPES = ["T-Shirt", "Long Sleeve", "Jersey", "Hoodie"];

export function ListingSidebar({ filters, setFilters }: ListingSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    price: true,
    gender: false,
    productType: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    setFilters({ ...filters, priceRange: newRange });
  };

  const toggleGender = (gender: string) => {
    setFilters({
      ...filters,
      gender: filters.gender.includes(gender)
        ? filters.gender.filter((g) => g !== gender)
        : [...filters.gender, gender],
    });
  };

  const toggleProductType = (type: string) => {
    setFilters({
      ...filters,
      productType: filters.productType.includes(type)
        ? filters.productType.filter((t) => t !== type)
        : [...filters.productType, type],
    });
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 1000],
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
    <div className="w-full max-w-sm bg-offwhite rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
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
          className="w-full flex items-center justify-between mb-4 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Sort By</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.sort ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.sort && (
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
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
          className="w-full flex items-center justify-between mb-4 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Price Range</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-600 block mb-2 font-medium">Min</label>
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600 block mb-2 font-medium">Max</label>
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700 border border-gray-200">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </div>
          </div>
        )}
      </div>





      {/* Gender */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection("gender")}
          className="w-full flex items-center justify-between mb-4 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Gender</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.gender ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.gender && (
          <div className="space-y-2">
            {GENDERS.map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() => toggleGender(g)}
                  className="w-4 h-4 rounded border-gray-300 accent-gray-700"
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
          className="w-full flex items-center justify-between mb-4 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Product Type</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.productType ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.productType && (
          <div className="space-y-2">
            {PRODUCT_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.productType.includes(type)}
                  onChange={() => toggleProductType(type)}
                  className="w-4 h-4 rounded border-gray-300 accent-gray-700"
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

export function AppSidebar() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    sortBy: "newest",
    gender: [],
    productType: [],
  });

  return <ListingSidebar filters={filters} setFilters={setFilters} />;
}
