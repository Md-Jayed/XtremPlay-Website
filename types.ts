
export enum Page {
  Home = 'home',
  PlanVisit = 'plan-visit',
  Parties = 'parties',
  SchoolTrips = 'school-trips',
  Gallery = 'gallery',
  Contact = 'contact',
  Admin = 'admin',
  Cart = 'cart'
}

export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface NavItem {
  id: Page;
  labelEn: string;
  labelAr: string;
}

export interface PricingCard {
  titleEn: string;
  titleAr: string;
  priceEn: string;
  priceAr: string;
  featuresEn: string[];
  featuresAr: string[];
  bestValue?: boolean;
}

export interface GalleryImage {
  id: number;
  url: string;
  created_at?: string;
}

export interface CartItem {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  quantity: number;
  type: 'ticket' | 'package';
}

export interface Order {
  id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  payment_method: 'cash';
  created_at?: string;
}
