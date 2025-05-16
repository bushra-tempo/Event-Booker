import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  FilterIcon,
  MapPinIcon,
  TagIcon,
  XIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApplyFilters?: (filters: FilterValues) => void;
}

interface FilterValues {
  dateRange: { from: Date | undefined; to: Date | undefined };
  category: string;
  priceRange: [number, number];
  location: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen = true,
  onClose = () => {},
  onApplyFilters = () => {},
}) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [location, setLocation] = useState<string>("");

  const categories = [
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "arts", label: "Arts & Theater" },
    { value: "conference", label: "Conferences" },
    { value: "workshop", label: "Workshops" },
  ];

  const locations = [
    { value: "new-york", label: "New York" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "miami", label: "Miami" },
    { value: "austin", label: "Austin" },
  ];

  const handleApplyFilters = () => {
    onApplyFilters({
      dateRange,
      category,
      priceRange,
      location,
    });
  };

  const handleClearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setCategory("");
    setPriceRange([0, 1000]);
    setLocation("");
  };

  if (!isOpen) return null;

  return (
    <div className="w-full md:w-80 h-full bg-background border-r p-4 flex flex-col overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FilterIcon className="mr-2 h-5 w-5" />
          Filters
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>

      <Separator className="mb-4" />

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="date"
      >
        <AccordionItem value="date">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Date Range</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <TagIcon className="mr-2 h-4 w-4" />
              <span>Event Category</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <span>Price Range</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                defaultValue={priceRange}
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
              />
              <div className="flex gap-4 mt-2">
                <div className="w-1/2">
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <span>Location</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-auto pt-6 space-y-2">
        <Button className="w-full" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
