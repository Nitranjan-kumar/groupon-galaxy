
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchDeals } from '@/data/mockDeals';
import { Deal } from '@/types/deal';
import { useLocation } from '@/hooks/useLocation';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Deal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const { location } = useLocation();

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('groupon-recent-searches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Failed to parse recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const updatedSearches = [
      query,
      ...recentSearches.filter(item => item !== query)
    ].slice(0, 5); // Keep last 5 searches
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('groupon-recent-searches', JSON.stringify(updatedSearches));
  }, [recentSearches]);

  // Perform search
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchDeals(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching deals:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search submit
  const handleSearchSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    saveRecentSearch(searchQuery);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(location)}`);
  }, [searchQuery, navigate, saveRecentSearch, location]);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('groupon-recent-searches');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch,
    handleSearchSubmit,
    recentSearches,
    clearRecentSearches
  };
};
