
export interface Category {
  _id: string;
  name: string;
}

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationType {
  page: string;
  limit: string;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  status: string;
  data: {
    products: ProductType[];
    pagination: PaginationType;
  };
}

export interface PaginationProps {
  pagination: {
    page: string;
    limit: string;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}