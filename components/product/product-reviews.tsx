"use client";

import { useMemo, useState } from "react";
import { Star, Trash2 } from "lucide-react";

import { useReviews } from "@/context/review-context";

interface ProductReviewsProps {
  productId: number;
}

export function ProductReviews({
  productId,
}: ProductReviewsProps) {
  const {
    getProductReviews,
    addReview,
    deleteReview,
  } = useReviews();

  const reviews = getProductReviews(productId);

  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    return total / reviews.length;
  }, [reviews]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = userName.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating.");
      return;
    }

    if (!trimmedComment) {
      setError("Please write a review.");
      return;
    }

    addReview(
      productId,
      trimmedName,
      rating,
      trimmedComment,
    );

    setUserName("");
    setRating(0);
    setComment("");
    setError("");
  }

  return (
    <section className="border-t border-neutral-200 py-16 dark:border-neutral-800 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Customer feedback
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Reviews
            </h2>

            {reviews.length > 0 && (
              <div className="flex items-center gap-2 pb-1 text-sm text-neutral-500">
                <Star className="h-4 w-4 fill-current" />
                <span>
                  {averageRating.toFixed(1)} ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
                <p className="text-sm text-neutral-500">
                  No reviews yet. Be the first to review this
                  product.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="border-b border-neutral-200 pb-6 last:border-0 dark:border-neutral-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold">
                          {review.userName}
                        </p>

                        <div className="mt-2 flex items-center gap-1">
                          {Array.from({ length: 5 }).map(
                            (_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${
                                  index < review.rating
                                    ? "fill-current"
                                    : "text-neutral-300 dark:text-neutral-700"
                                }`}
                              />
                            ),
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteReview(review.id)}
                        className="text-neutral-400 transition-colors hover:text-red-600"
                        aria-label={`Delete review by ${review.userName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                      {review.comment}
                    </p>

                    <p className="mt-3 text-xs text-neutral-400">
                      {new Date(
                        review.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
          >
            <h3 className="text-lg font-semibold">
              Write a review
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="review-name"
                  className="text-sm font-medium"
                >
                  Your name
                </label>

                <input
                  id="review-name"
                  type="text"
                  value={userName}
                  onChange={(event) =>
                    setUserName(event.target.value)
                  }
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-neutral-950 dark:border-neutral-700 dark:focus:border-white"
                />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Your rating
                </p>

                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map(
                    (_, index) => {
                      const starRating = index + 1;

                      return (
                        <button
                          key={starRating}
                          type="button"
                          onClick={() =>
                            setRating(starRating)
                          }
                          aria-label={`Rate ${starRating} out of 5`}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              starRating <= rating
                                ? "fill-current"
                                : "text-neutral-300 dark:text-neutral-700"
                            }`}
                          />
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="review-comment"
                  className="text-sm font-medium"
                >
                  Your review
                </label>

                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  placeholder="Share your experience..."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-neutral-950 dark:border-neutral-700 dark:focus:border-white"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                Submit review
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}