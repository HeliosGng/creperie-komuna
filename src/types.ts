export type Language = 'en' | 'sq';

export type CategoryId = 
  | 'all'
  | 'sweet_classic'
  | 'sweet_premium'
  | 'savory'
  | 'special'
  | 'salads'
  | 'sandwiches'
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // in ALL / Lek
  description: {
    sq: string;
    en: string;
  };
  ingredients?: {
    sq: string[];
    en: string[];
  };
  image: string;
  popular?: boolean;
  isNew?: boolean;
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  calories?: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  reviewCount?: string;
  rating: number;
  date: {
    sq: string;
    en: string;
  };
  comment: {
    sq: string;
    en: string;
  };
  tags?: string[];
}

export interface TableReservation {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  area: 'indoor' | 'terrace';
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface BusinessInfo {
  name: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  address: {
    sq: string;
    en: string;
  };
  plusCode: string;
  phone: string;
  hours: {
    sq: string;
    en: string;
  };
  woltUrl: string;
  mapUrl: string;
}
