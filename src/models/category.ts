export interface CategoryResponse {
  statusCode: number;
  message: string;
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
