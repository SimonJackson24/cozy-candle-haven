import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Interior Designer",
    content: "These candles have transformed my home. The scents are incredible and long-lasting!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Home Enthusiast",
    content: "The best candles I've ever purchased. The attention to detail is remarkable.",
    rating: 5
  },
  {
    name: "Emma Williams",
    role: "Yoga Instructor",
    content: "Perfect for creating a calming atmosphere during my meditation sessions.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-primary/10 to-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fadeIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">What Our Customers Say</h2>
          <p className="text-gray-600 leading-relaxed">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-8 bg-white/50 backdrop-blur-sm rounded-lg space-y-6 text-center">
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-serif text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};