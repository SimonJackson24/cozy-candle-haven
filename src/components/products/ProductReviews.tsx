import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  rating: number;
  comment: string;
  customer_name: string;
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

export const ProductReviews = ({ productId, reviews = [] }: ProductReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting review:", { productId, rating, comment });
    
    // TODO: Implement with Medusa's custom attributes
    // For now, just show a success message
    toast({
      title: "Success",
      description: "Thank you for your review!",
    });
    
    setRating(0);
    setComment("");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-serif">Customer Reviews</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        
        <Textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
        
        <Button 
          onClick={handleSubmitReview}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Submit Review
        </Button>
      </div>

      <div className="space-y-4 mt-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
            <div className="text-xs text-gray-500">
              {review.customer_name} - {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};