
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import DealCard from '@/components/DealCard';
import CategoryFilter from '@/components/CategoryFilter';
import { searchDeals } from '@/data/mockDeals';
import { getAllCategories } from '@/data/categories';
import { Deal } from '@/types/deal';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation } from '@/hooks/useLocation';

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const locationParam = searchParams.get('loc') || '';
  const { location, setLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState(query);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('recommended');
  const routerLocation = useRouterLocation();

  // Update location state from URL param if present
  useEffect(() => {
    if (locationParam && locationParam !== location) {
      setLocation(locationParam);
    }
  }, [locationParam, location, setLocation]);

  // Fetch search results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setDeals([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchDeals(query);
        
        // Sort deals based on sortOrder
        let sortedDeals = [...results];
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
        console.error('Error searching deals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, sortOrder]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearchParams({
      q: searchQuery,
      loc: location,
    });
  };

  const categories = getAllCategories().map(cat => ({
    id: cat.id,
    name: cat.name,
  }));

  return (
    <div className="min-h-screen bg-groupon-lightGray pb-10">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder={`Search in ${location}...`}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-groupon-gray">
            {query && (
              <>
                {isLoading ? 'Searching...' : `${deals.length} results for "${query}" in ${location}`}
              </>
            )}
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
            ) : query && deals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {deals.map(deal => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : query ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
                <p className="text-groupon-gray mb-4">
                  We couldn't find any deals matching "{query}" in {location}.
                </p>
                <Button asChild variant="outline">
                  <a href="/category/all">Browse All Deals</a>
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Search for Deals</h2>
                <p className="text-groupon-gray mb-4">
                  Enter a search term to find deals in {location}.
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

export default SearchResults;
