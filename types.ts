
export enum Page {
  Home = 'home',
  PlanVisit = 'plan-visit',
  Parties = 'parties',
  SchoolTrips = 'school-trips',
  Gallery = 'gallery',
  Contact = 'contact',
  Admin = 'admin'
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
