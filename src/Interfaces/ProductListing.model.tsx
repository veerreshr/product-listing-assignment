export interface ProductListingType {
  products: ProductType[];
}

export interface ProductType {
  id: number;
  title: string;
  image: string;
  price: number;
  sizes: string[];
  brand: string;
  ideal_for: string[];
}
