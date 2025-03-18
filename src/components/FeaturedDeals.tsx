
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DealCard from '@/components/DealCard';
import { Deal } from '@/types/deal';

interface FeaturedDealsProps {
  title: string;
  deals: Deal[];
  viewAllLink?: string;
}

const FeaturedDeals = ({ title, deals, viewAllLink }: FeaturedDealsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };
  
  const [displayCount, setDisplayCount] = useState(itemsPerPage.md);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(itemsPerPage.sm);
      } else if (window.innerWidth < 768) {
        setDisplayCount(itemsPerPage.md);
      } else if (window.innerWidth < 1024) {
        setDisplayCount(itemsPerPage.lg);
      } else {
        setDisplayCount(itemsPerPage.xl);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(deals.length / displayCount);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= totalPages ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const displayDeals = deals.slice(
    currentIndex * displayCount,
    currentIndex * displayCount + displayCount
  );

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        
        <div className="flex items-center">
          {viewAllLink && (
            <Link 
              to={viewAllLink} 
              className="text-groupon-blue hover:underline mr-4 text-sm font-medium"
            >
              View All
            </Link>
          )}
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              className="h-8 w-8"
              disabled={deals.length <= displayCount}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              className="h-8 w-8"
              disabled={deals.length <= displayCount}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDeals;
