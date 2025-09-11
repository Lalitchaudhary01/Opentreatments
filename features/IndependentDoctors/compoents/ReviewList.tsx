// /features/doctors/components/ReviewList.tsx
import React from "react";
import { Review } from "../types/IndependentDoctor";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews available.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded p-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{review.reviewerName}</span>
            <span className="text-yellow-500">⭐ {review.rating}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
