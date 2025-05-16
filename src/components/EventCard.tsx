import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  price: number | string;
  category?: string;
  image: string;
  onBookNow?: (id: string) => void;
  onClick?: (id: string) => void;
}

const EventCard = ({
  id = "1",
  title = "Event Title",
  date = "June 15, 2024",
  time = "7:00 PM",
  location = "San Francisco, CA",
  price = "$49.99",
  category = "Music",
  image = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
  onBookNow = () => {},
  onClick = () => {},
}: EventCardProps) => {
  const handleCardClick = () => {
    onClick(id);
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    onBookNow(id);
  };

  return (
    <Card
      className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-primary font-medium"
          >
            {category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardHeader>

      <CardContent className="space-y-2 pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>{date}</span>
          {time && (
            <>
              <span className="mx-1">•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{time}</span>
            </>
          )}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPinIcon className="h-4 w-4 mr-2" />
          <span className="truncate">{location}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-0">
        <div className="font-semibold text-primary">
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </div>
        <Button size="sm" onClick={handleBookNowClick}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
