export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isHot?: boolean;
  isNew?: boolean;
  image: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  weights: string[];
  flavorNotes: string[];
  inStock: boolean;
  prepTime: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isSpecial?: boolean;
  badge?: string;
  children?: {
    name: string;
    href: string;
    description?: string;
  }[];
}

export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  recipientName: string;
  phone: string;
  deliveryAddress: string;
  agreeTerms: boolean;
  newsletter?: boolean;
}

export type RegistrationFormErrors = Partial<Record<keyof UserRegistrationData, string>> & {
  general?: string;
};

export interface RegisteredUser extends Omit<UserRegistrationData, 'password'> {
  id: string;
  registeredAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}
