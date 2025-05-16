import React, { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "./EventCard";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
}

interface EventGridProps {
  events?: Event[];
  filters?: {
    dateRange?: { from: Date; to: Date } | null;
    category?: string | null;
    priceRange?: { min: number; max: number } | null;
    location?: string | null;
  };
}

const EventGrid = ({ events = [], filters = {} }: EventGridProps) => {
  // Default events if none are provided
  const defaultEvents: Event[] = [
    {
      id: "1",
      title: "Summer Music Festival",
      date: "2023-07-15",
      location: "Central Park, New York",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
      category: "Music",
    },
    {
      id: "2",
      title: "Tech Conference 2023",
      date: "2023-08-10",
      location: "Convention Center, San Francisco",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      category: "Technology",
    },
    {
      id: "3",
      title: "Food & Wine Festival",
      date: "2023-09-05",
      location: "Downtown District, Chicago",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      category: "Food",
    },
    {
      id: "4",
      title: "Art Exhibition Opening",
      date: "2023-07-22",
      location: "Modern Art Museum, Los Angeles",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
      category: "Art",
    },
    {
      id: "5",
      title: "Marathon 2023",
      date: "2023-10-12",
      location: "City Center, Boston",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
      category: "Sports",
    },
    {
      id: "6",
      title: "Comedy Night Special",
      date: "2023-08-18",
      location: "Laugh Factory, Miami",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80",
      category: "Entertainment",
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  // Animation variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // State for selected event (could be used for quick preview or actions)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleCardClick = (eventId: string) => {
    setSelectedEventId(eventId);
    // This could trigger a modal or navigate to event detail page
  };

  return (
    <div className="bg-background w-full p-4">
      {displayEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <h3 className="text-xl font-medium text-gray-500">No events found</h3>
          <p className="text-gray-400 mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(event.id)}
            >
              <EventCard
                id={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                price={event.price}
                image={event.image}
                category={event.category}
                isSelected={event.id === selectedEventId}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default EventGrid;
