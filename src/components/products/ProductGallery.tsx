import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Image = {
  url: string;
  id?: string;
};

interface ProductGalleryProps {
  images: (Image | string)[];
  title: string;
}

export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomDialogOpen, setIsZoomDialogOpen] = useState(false);

  const getImageUrl = (image: Image | string): string => {
    return typeof image === 'string' ? image : image.url;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Dialog open={isZoomDialogOpen} onOpenChange={setIsZoomDialogOpen}>
          <DialogTrigger asChild>
            <img
              src={getImageUrl(images[currentImageIndex]) || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover cursor-zoom-in"
            />
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <img
              src={getImageUrl(images[currentImageIndex]) || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square rounded-md overflow-hidden border-2 ${
                currentImageIndex === index
                  ? "border-accent"
                  : "border-transparent"
              }`}
            >
              <img
                src={getImageUrl(image) || "/placeholder.svg"}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};