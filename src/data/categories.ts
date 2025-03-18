
export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
}

export const categories: Category[] = [
  { 
    id: 'local', 
    name: 'Local', 
    description: 'Discover the best deals in your area',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  { 
    id: 'travel', 
    name: 'Travel', 
    description: 'Exclusive deals on hotels, vacations, and getaways',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  { 
    id: 'products', 
    name: 'Products', 
    description: 'Shop the latest products at amazing prices',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  { 
    id: 'restaurants', 
    name: 'Restaurants', 
    description: 'Save at top restaurants in your city',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Spas', 
    description: 'Pamper yourself for less',
    imageUrl: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  { 
    id: 'activities', 
    name: 'Activities', 
    description: 'Fun activities and adventures at great prices',
    imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  { 
    id: 'wellness', 
    name: 'Health & Wellness', 
    description: 'Deals on fitness, health services, and more',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  { 
    id: 'home', 
    name: 'Home Services', 
    description: 'Save on home improvement and maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  { 
    id: 'auto', 
    name: 'Automotive', 
    description: 'Deals on auto services and maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
];

export const getFeaturedCategories = (): Category[] => {
  return categories.filter(category => category.featured);
};

export const getAllCategories = (): Category[] => {
  return categories;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
