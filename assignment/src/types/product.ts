export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};


export type CartItemType = Product & {
  quantity : number
}

export type CartType = {
  items : CartItemType[],
  total :number
}

