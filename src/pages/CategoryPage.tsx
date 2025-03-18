
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import DealCard from '@/components/DealCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Deal } from '@/types/deal';
import { getDealsByCategory } from '@/data/mockDeals';
import { getCategoryById, getAllCategories } from '@/data/categories';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
];

const CategoryPage = () => {
  const { categoryId = 'all' } = useParams<{ categoryId: string }>();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('recommended');
  const [categoryName, setCategoryName] = useState('All Deals');

  useEffect(() => {
    const fetchDeals = async () => {
      setIsLoading(true);
      try {
        // Fetch category name if not "all"
        if (categoryId !== 'all') {
          const category = getCategoryById(categoryId);
          if (category) {
            setCategoryName(category.name);
          }
        } else {
          setCategoryName('All Deals');
        }
        
        // Fetch deals
        const fetchedDeals = await getDealsByCategory(categoryId);
        
        // Sort deals based on sortOrder
        let sortedDeals = [...fetchedDeals];
        switch (sortOrder) {
          case 'popular':
            sortedDeals.sort((a, b) => (b.sold || 0) - (a.sold || 0));
            break;
          case 'rating':
            sortedDeals.sort((a, b) => b.rating - a.rating);
            break;
          case 'priceLow':
            sortedDeals.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
          case 'priceHigh':
            sortedDeals.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
          default:
            // Default 'recommended' sort
            break;
        }
        
        setDeals(sortedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, [categoryId, sortOrder]);

  const categories = getAllCategories().map(cat => ({
    id: cat.id,
    name: cat.name
  }));

  return (
    <div className="min-h-screen bg-groupon-lightGray pb-10">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{categoryName}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-groupon-gray">
            {isLoading ? 'Loading...' : `${deals.length} deals available`}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <SlidersHorizontal size={16} />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                    <SheetDescription>
                      Browse deals by category
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <CategoryFilter categories={categories} title="" />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Sort Dropdown */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Filter - Desktop */}
          <div className="hidden md:block w-60 flex-shrink-0">
            <CategoryFilter categories={categories} />
          </div>
          
          {/* Deals Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-groupon-blue"></div>
              </div>
            ) : deals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {deals.map(deal => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No Deals Found</h2>
                <p className="text-groupon-gray mb-4">
                  We couldn't find any deals in this category right now.
                </p>
                <Button asChild variant="outline">
                  <a href="/category/all">Browse All Deals</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
