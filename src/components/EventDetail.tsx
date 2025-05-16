import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Speaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

interface Venue {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  mapUrl: string;
  facilities: string[];
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

interface EventDetailProps {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  time?: string;
  location?: string;
  price?: number;
  category?: string;
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  venue?: Venue;
  ticketTypes?: TicketType[];
  hasSeating?: boolean;
}

const EventDetail: React.FC<EventDetailProps> = ({
  id = "1",
  title = "Tech Conference 2023",
  description = "Join us for the biggest tech conference of the year featuring industry leaders, workshops, and networking opportunities.",
  image = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  date = "June 15-17, 2023",
  time = "9:00 AM - 5:00 PM",
  location = "Tech Convention Center, San Francisco",
  price = 299,
  category = "Technology",
  speakers = [
    {
      id: "1",
      name: "Jane Smith",
      role: "CTO at TechCorp",
      bio: "Jane is a renowned technology leader with over 15 years of experience in software development and AI.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "2",
      name: "John Doe",
      role: "Founder of StartupX",
      bio: "John has founded three successful tech startups and is an expert in product development.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      role: "AI Research Lead",
      bio: "Sarah leads cutting-edge research in artificial intelligence and machine learning applications.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  ],
  agenda = [
    {
      time: "9:00 AM",
      title: "Registration & Breakfast",
      description:
        "Check in and enjoy a complimentary breakfast with fellow attendees.",
    },
    {
      time: "10:00 AM",
      title: "Keynote: The Future of Tech",
      description:
        "An inspiring talk about upcoming technology trends and innovations.",
      speaker: "Jane Smith",
    },
    {
      time: "11:30 AM",
      title: "Workshop: Building Scalable Applications",
      description:
        "Learn practical techniques for building applications that can handle millions of users.",
      speaker: "John Doe",
    },
    {
      time: "1:00 PM",
      title: "Lunch Break",
      description: "Networking lunch with special dietary options available.",
    },
    {
      time: "2:30 PM",
      title: "Panel: AI Ethics and Implementation",
      description:
        "Industry experts discuss the ethical considerations of AI deployment.",
      speaker: "Sarah Johnson",
    },
  ],
  venue = {
    name: "Tech Convention Center",
    address: "123 Innovation Blvd",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    mapUrl: "https://maps.google.com",
    facilities: [
      "Wi-Fi",
      "Accessible Entrances",
      "Parking",
      "Food Court",
      "Charging Stations",
    ],
  },
  ticketTypes = [
    {
      id: "1",
      name: "General Admission",
      price: 299,
      description:
        "Access to all general sessions, workshops, and networking events.",
      available: 150,
    },
    {
      id: "2",
      name: "VIP Pass",
      price: 599,
      description:
        "General admission plus exclusive VIP lounge access, priority seating, and speaker meet & greet.",
      available: 50,
    },
    {
      id: "3",
      name: "Workshop Pass",
      price: 199,
      description:
        "Access to all workshops only. Does not include general sessions.",
      available: 100,
    },
  ],
  hasSeating = true,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<string>(
    ticketTypes[0]?.id || "",
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleTicketSelect = (id: string) => {
    setSelectedTicket(id);
  };

  const selectedTicketType = ticketTypes.find(
    (ticket) => ticket.id === selectedTicket,
  );

  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] mb-8">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <Badge className="mb-2 w-fit">{category}</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>From ${price}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="venue">Venue</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold">About This Event</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold">What You'll Get</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Access to all keynote presentations</li>
                      <li>Interactive workshops with industry experts</li>
                      <li>Networking opportunities with peers and leaders</li>
                      <li>Conference materials and resources</li>
                      <li>Complimentary meals and refreshments</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="agenda" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold">Event Schedule</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {agenda.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-primary pl-4 relative"
                        >
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                          <p className="text-sm text-muted-foreground">
                            {item.time}
                          </p>
                          <h3 className="text-lg font-medium">{item.title}</h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                          {item.speaker && (
                            <p className="text-sm font-medium mt-1">
                              Speaker: {item.speaker}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="speakers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold">
                      Featured Speakers
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {speakers.map((speaker) => (
                        <div key={speaker.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={speaker.avatar}
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {speaker.role}
                            </p>
                            <p className="text-sm mt-2">{speaker.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="venue" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold">
                      Venue Information
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">{venue.name}</h3>
                        <p className="text-muted-foreground">
                          {venue.address}, {venue.city}, {venue.state}{" "}
                          {venue.zip}
                        </p>
                      </div>

                      <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        {/* Placeholder for map - in a real app, embed an actual map here */}
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <MapPin className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-muted-foreground">
                            Map View
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Facilities</h3>
                        <div className="flex flex-wrap gap-2">
                          {venue.facilities.map((facility, index) => (
                            <Badge key={index} variant="outline">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <h2 className="text-xl font-semibold">Book Your Tickets</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Select Ticket Type
                  </h3>
                  <div className="space-y-3">
                    {ticketTypes.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`border rounded-md p-3 cursor-pointer transition-colors ${selectedTicket === ticket.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => handleTicketSelect(ticket.id)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium">{ticket.name}</h4>
                          <span className="font-semibold">${ticket.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {ticket.description}
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          {ticket.available} tickets remaining
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium block mb-2"
                  >
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {hasSeating && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Seating Chart</h3>
                    <div className="bg-muted rounded-md p-4 flex items-center justify-center h-[150px]">
                      <p className="text-center text-muted-foreground text-sm">
                        You'll select your seats in the next step
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per ticket</span>
                    <span>${selectedTicketType?.price || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(selectedTicketType?.price || 0) * quantity}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetail;
