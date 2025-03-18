
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Deal } from '@/types/deal';
import { cn } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
  className?: string;
}

const DealCard = ({ deal, className }: DealCardProps) => {
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100
  );

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="relative">
        <Link to={`/deal/${deal.id}`}>
          <img 
            src={deal.imageUrl} 
            alt={deal.title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="deal-badge">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Wishlist Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-groupon-gray hover:text-red-500 rounded-full"
        >
          <Heart size={18} />
        </Button>
      </div>
      
      <div className="p-4">
        {/* Merchant */}
        <p className="text-sm text-groupon-gray mb-1">{deal.merchant}</p>
        
        {/* Title */}
        <Link to={`/deal/${deal.id}`}>
          <h3 className="font-semibold mb-2 hover:text-groupon-blue transition-colors line-clamp-2">
            {deal.title}
          </h3>
        </Link>
        
        {/* Location */}
        <p className="text-xs text-groupon-gray mb-2">{deal.location}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={cn(
                "text-xs",
                i < Math.floor(deal.rating) ? "text-yellow-400" : "text-groupon-lightGray"
              )}>★</span>
            ))}
          </div>
          <span className="text-xs text-groupon-gray ml-1">
            ({deal.reviewCount})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center">
          <span className="price-tag text-lg mr-2">
            ${deal.currentPrice.toFixed(2)}
          </span>
          {deal.originalPrice > deal.currentPrice && (
            <span className="original-price text-sm">
              ${deal.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealCard;
