"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProductReviewsProps {
  productId: number;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "highest" | "lowest"
  >("newest");

  // Mock reviews data - replace with actual API call
  const reviews: Review[] = [
    {
      id: "1",
      userId: "user1",
      userName: "John D.",
      rating: 5,
      title: "Excellent product!",
      comment:
        "This product exceeded my expectations. The quality is outstanding and it works perfectly. Highly recommended!",
      date: "2024-01-15",
      verified: true,
      helpful: 12,
      notHelpful: 1,
    },
    {
      id: "2",
      userId: "user2",
      userName: "Sarah M.",
      rating: 4,
      title: "Good value for money",
      comment:
        "Overall satisfied with the purchase. Good quality and fast shipping. Only minor issue is the packaging could be better.",
      date: "2024-01-10",
      verified: true,
      helpful: 8,
      notHelpful: 0,
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike R.",
      rating: 5,
      title: "Perfect!",
      comment:
        "Exactly what I was looking for. Great build quality and excellent customer service.",
      date: "2024-01-05",
      verified: false,
      helpful: 5,
      notHelpful: 2,
    },
  ];

  const averageRating = 4.8;
  const totalReviews = 124;

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 72 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 7, percentage: 6 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating}</div>
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {totalReviews} reviews
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm">{item.stars}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress value={item.percentage} className="flex-1" />
              <span className="text-sm text-gray-600 w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Reviews ({reviews.length})</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <h5 className="font-medium mb-2">{review.title}</h5>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {review.helpful}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    {review.notHelpful}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center pt-6 border-t">
        <Button size="lg">Write a Review</Button>
      </div>
    </div>
  );
}
