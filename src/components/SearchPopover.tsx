
import { useState, useEffect, useRef } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/hooks/useSearch';
import { useLocation } from '@/hooks/useLocation';
import { Link } from 'react-router-dom';

interface SearchPopoverProps {
  mobile?: boolean;
}

const SearchPopover = ({ mobile = false }: SearchPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching,
    performSearch,
    handleSearchSubmit,
    recentSearches,
    clearRecentSearches
  } = useSearch();
  const { location } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Perform search when input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Focus input when popover opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {mobile ? (
          <div className="relative w-full">
            <Input
              placeholder="Search deals..."
              className="pr-10"
              onClick={() => setIsOpen(true)}
              readOnly
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
              onClick={() => setIsOpen(true)}
            >
              <Search size={18} />
            </Button>
          </div>
        ) : (
          <div className="relative w-full">
            <Input
              placeholder="Search deals..."
              className="pr-10"
              onClick={() => setIsOpen(true)}
              readOnly
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
              onClick={() => setIsOpen(true)}
            >
              <Search size={18} />
            </Button>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent 
        className="w-[300px] sm:w-[400px] p-0" 
        align="start"
        side="bottom"
      >
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center border-b p-2">
            <Search size={18} className="ml-2 text-gray-400" />
            <Input
              ref={inputRef}
              placeholder={`Search deals in ${location}...`}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </form>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {isSearching ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-groupon-blue rounded-full"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-sm font-medium px-2">Search Results</h3>
              {searchResults.map((deal) => (
                <Link
                  key={deal.id}
                  to={`/deal/${deal.id}`}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 mr-2">
                    <img 
                      src={deal.imageUrl} 
                      alt={deal.title} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{deal.title}</p>
                    <p className="text-xs text-gray-500">{deal.merchant}</p>
                  </div>
                </Link>
              ))}
              <div className="pt-2 text-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    handleSearchSubmit();
                    setIsOpen(false);
                  }}
                >
                  See all results
                </Button>
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center py-4 text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : recentSearches.length > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-sm font-medium">Recent Searches</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 h-auto py-1"
                >
                  Clear
                </Button>
              </div>
              {recentSearches.map((query, index) => (
                <button
                  key={index}
                  className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left"
                  onClick={() => {
                    setSearchQuery(query);
                    performSearch(query);
                  }}
                >
                  <Clock size={14} className="mr-2 text-gray-400" />
                  <span className="text-sm">{query}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              Try searching for deals, categories, or locations
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopover;
