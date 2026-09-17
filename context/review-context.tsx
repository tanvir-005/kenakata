"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import type { Review } from "@/types";

interface ReviewContextValue {
  reviews: Review[];
  addReview: (
    productId: number,
    userName: string,
    rating: number,
    comment: string,
  ) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: number) => Review[];
}

const ReviewContext = createContext<
  ReviewContextValue | undefined
>(undefined);

const STORAGE_KEY = "kenakata-reviews";

function loadReviews(): Review[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedReviews = localStorage.getItem(STORAGE_KEY);

    if (!storedReviews) {
      return [];
    }

    const parsedReviews: unknown = JSON.parse(storedReviews);

    if (!Array.isArray(parsedReviews)) {
      return [];
    }

    return parsedReviews;
  } catch {
    return [];
  }
}

export function ReviewProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [reviews, setReviews] = useState<Review[]>(loadReviews);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(reviews),
    );
  }, [reviews]);

  const addReview = useCallback(
    (
      productId: number,
      userName: string,
      rating: number,
      comment: string,
    ) => {
      const newReview: Review = {
        id: crypto.randomUUID(),
        productId,
        userName,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };

      setReviews((currentReviews) => [
        newReview,
        ...currentReviews,
      ]);
    },
    [],
  );

  const deleteReview = useCallback((reviewId: string) => {
    setReviews((currentReviews) =>
      currentReviews.filter(
        (review) => review.id !== reviewId,
      ),
    );
  }, []);

  const getProductReviews = useCallback(
    (productId: number) => {
      return reviews.filter(
        (review) => review.productId === productId,
      );
    },
    [reviews],
  );

  const value = useMemo(
    () => ({
      reviews,
      addReview,
      deleteReview,
      getProductReviews,
    }),
    [
      reviews,
      addReview,
      deleteReview,
      getProductReviews,
    ],
  );

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error(
      "useReviews must be used within a ReviewProvider",
    );
  }

  return context;
}