
export interface Deal {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  fineprint: string;
  imageUrl: string;
  gallery?: string[];
  currentPrice: number;
  originalPrice: number;
  merchant: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  sold?: number;
  expiresAt?: string;
  redemptionLocation?: string;
  features?: string[];
}
