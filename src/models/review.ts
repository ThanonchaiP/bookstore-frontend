export type Review = {
  id: number;
  body: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: { id: string; firstname: string };
};

export type ReviewPayload = {
  id?: number;
  orderItemId?: string;
  bookId?: string;
  body?: string;
  rating?: number;
};

export interface BookReview {
  reviews: Review[];
  ratingStar: RatingStar[];
  ratingAvg: number;
}

interface RatingStar {
  rating: number;
  count: string;
  percent: number;
}
