// types.ts

export interface Product {
    id: number;
    title: string;
    desc: string;
    price: string;
    isFeatured: boolean;
    categoryId: string;
    colorId: string;
    lengthId: string;
    textureId: string;
    methodId: string;
    createdAt: string;
    updatedAt: string;
    images: [];
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  