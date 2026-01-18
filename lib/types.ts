export interface InsertProductPayLoad {
  _id?: string;
  productName: string;
  status: string;
  price: number;
  taxClass: string;
  category: string;
  description: string;
  sku?: string;
  variants: variant[];
  createdAt: Date | string;
  updatedAt: Date | string;
  options: Options;
  rating?: rating;
  reviews?: review[];
}
export interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
export interface ListingCardProps {
  listing: InsertProductPayLoad;
}

export type Options = {
  sizes: string[];
  colors: Color[];
};
export interface rating {
  avg?: number;
  count?: number;
  sum?: number;
}
export type Color = {
  name: string;
  hex: string;
};

export type review = {
  userName?: string;
  rating?: number;
  comment?: string;
  date?: Date;
};

export type variant = {
  sku: string;
  price: number;
  color: string;
  imageCount?: number;
  size: string; 
  quantity: number;
  images: ImageType[];
  status: string;
};

export type ImageType = {
    
    filename: string;
    imgsize: number;
    type: string;
    url: string
}

export type filterOptions = {
  sizes?: string[];
  colors?: string[];
  type?: string[];
};


export interface Location {
  id:string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}