export interface CategoryResponse {
  statusCode: number;
  message: string;
  data: Category[];
  meta: any[];
}

export interface Category {
  id: number;
  name: string;
}
