import React, { useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import EventGrid from "./EventGrid";
import FilterSidebar from "./FilterSidebar";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
}

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    dateRange: { from: null, to: null },
    category: "",
    priceRange: { min: 0, max: 1000 },
    location: "",
  });

  // Mock events data
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Summer Music Festival",
      date: "2023-07-15",
      location: "Central Park, New York",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
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
      location: "Downtown, Chicago",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      category: "Food",
    },
    {
      id: "4",
      title: "Art Exhibition",
      date: "2023-07-22",
      location: "Modern Art Museum, Los Angeles",
      price: 25.0,
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
      category: "Art",
    },
    {
      id: "5",
      title: "Comedy Night",
      date: "2023-08-18",
      location: "Laugh Factory, Boston",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80",
      category: "Entertainment",
    },
    {
      id: "6",
      title: "Marathon 2023",
      date: "2023-10-01",
      location: "City Center, Seattle",
      price: 50.0,
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
      category: "Sports",
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">EventBooker</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-primary"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-primary"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-primary"
                  >
                    Venues
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-primary"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div
            className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-80 shrink-0`}
          >
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Event Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <p className="text-muted-foreground">
                Discover and book amazing events
              </p>
            </div>
            <EventGrid events={mockEvents} onEventSelect={handleEventSelect} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2023 EventBooker. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
