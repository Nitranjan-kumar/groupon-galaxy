
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Info, 
  Heart, 
  Share2, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Deal } from '@/types/deal';
import { getDealById, getTrendingDeals } from '@/data/mockDeals';
import { useCart } from '@/hooks/useCart';
import DealCard from '@/components/DealCard';

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [relatedDeals, setRelatedDeals] = useState<Deal[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDeal = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const fetchedDeal = await getDealById(id);
          if (fetchedDeal) {
            setDeal(fetchedDeal);
            
            // Set gallery images or use main image if no gallery
            if (!fetchedDeal.gallery) {
              fetchedDeal.gallery = [fetchedDeal.imageUrl];
            }
            
            // Fetch related deals
            const related = await getTrendingDeals();
            // Filter out current deal from related
            setRelatedDeals(related.filter(d => d.id !== id));
          }
        }
      } catch (error) {
        console.error('Error fetching deal:', error);
        toast({
          title: "Error",
          description: "Failed to load deal details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeal();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (deal) {
      addToCart(deal, quantity);
    }
  };

  const nextImage = () => {
    if (deal?.gallery) {
      setCurrentImage((prev) => (prev + 1) % deal.gallery!.length);
    }
  };

  const prevImage = () => {
    if (deal?.gallery) {
      setCurrentImage((prev) => (prev - 1 + deal.gallery!.length) % deal.gallery!.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-groupon-lightGray">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-groupon-blue"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-groupon-lightGray">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Deal Not Found</h2>
          <p className="text-groupon-gray mb-4">The deal you're looking for doesn't exist or has expired.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-groupon-lightGray pb-10">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm text-groupon-gray">
            <Link to="/" className="hover:text-groupon-blue">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${deal.category}`} className="hover:text-groupon-blue capitalize">{deal.category}</Link>
            <span className="mx-2">/</span>
            <span className="truncate max-w-[200px]">{deal.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deal Images & Details */}
          <div className="lg:col-span-2">
            {/* Deal Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative">
                {deal.gallery && (
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img 
                      src={deal.gallery[currentImage]}
                      alt={deal.title}
                      className="w-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    {deal.gallery.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                )}
                
                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-white/80 hover:bg-white text-groupon-gray hover:text-red-500 rounded-full"
                  >
                    <Heart size={18} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-white/80 hover:bg-white text-groupon-gray hover:text-groupon-blue rounded-full"
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnails */}
              {deal.gallery && deal.gallery.length > 1 && (
                <div className="flex overflow-x-auto p-2 space-x-2">
                  {deal.gallery.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden ${
                        idx === currentImage ? 'ring-2 ring-groupon-blue' : 'opacity-70'
                      }`}
                    >
                      <img src={img} alt={`${deal.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tabs Content */}
            <Tabs defaultValue="details" className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TabsList className="w-full border-b justify-start">
                <TabsTrigger value="details" className="flex-1 sm:flex-none">Details</TabsTrigger>
                <TabsTrigger value="highlights" className="flex-1 sm:flex-none">Highlights</TabsTrigger>
                <TabsTrigger value="terms" className="flex-1 sm:flex-none">Fine Print</TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="details">
                  <h2 className="text-xl font-bold mb-4">{deal.title}</h2>
                  
                  <div className="flex items-center text-sm text-groupon-gray mb-4">
                    <div className="flex mr-6">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(deal.rating) ? "text-yellow-400" : "text-groupon-lightGray"}>★</span>
                      ))}
                      <span className="ml-1">({deal.reviewCount})</span>
                    </div>
                    
                    {deal.sold && (
                      <div className="text-sm">
                        {deal.sold}+ bought
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <MapPin size={16} className="text-groupon-gray mr-1" />
                    <span className="text-sm">{deal.location}</span>
                  </div>
                  
                  <p className="text-base mb-6">
                    {deal.description}
                  </p>
                  
                  {deal.features && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Features</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {deal.features.map((feature, idx) => (
                          <li key={idx} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {deal.merchant && (
                    <div>
                      <h3 className="font-semibold mb-2">About {deal.merchant}</h3>
                      <p className="text-sm">
                        Experience the quality and service that makes {deal.merchant} a favorite in {deal.location}.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="highlights">
                  <h3 className="font-semibold mb-4">Highlights</h3>
                  <ul className="space-y-3">
                    {deal.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex">
                        <span className="text-groupon-green mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="terms">
                  <h3 className="font-semibold mb-4">Fine Print</h3>
                  <p className="text-sm mb-4">{deal.fineprint}</p>
                  
                  {deal.expiresAt && (
                    <div className="flex items-center text-sm mb-2">
                      <Calendar size={16} className="mr-2 text-groupon-gray" />
                      <span>Expires on {new Date(deal.expiresAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {deal.redemptionLocation && (
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-groupon-gray" />
                      <span>Redeem at: {deal.redemptionLocation}</span>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
            
            {/* FAQ Accordion */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6 p-6">
              <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I redeem this deal?</AccordionTrigger>
                  <AccordionContent>
                    After purchase, you'll receive a voucher via email. Present the voucher at the merchant location either printed or on your mobile device.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I buy this as a gift?</AccordionTrigger>
                  <AccordionContent>
                    Yes! This deal makes a great gift. During checkout, you'll have the option to send it directly to the recipient.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What's the refund policy?</AccordionTrigger>
                  <AccordionContent>
                    You can return any unredeemed voucher within 30 days of purchase for a full refund.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Does this expire?</AccordionTrigger>
                  <AccordionContent>
                    Yes, please check the "Fine Print" section for the expiration date. 
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Buy Box & Related Deals */}
          <div>
            {/* Buy Box */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-groupon-gray text-sm">From</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-groupon-blue">
                        ${deal.currentPrice.toFixed(2)}
                      </span>
                      {deal.originalPrice > deal.currentPrice && (
                        <span className="original-price text-sm ml-2">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {deal.originalPrice > deal.currentPrice && (
                    <div className="deal-badge">
                      {Math.round(((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  {deal.expiresAt && (
                    <div className="flex items-center text-sm mb-2">
                      <Clock size={14} className="mr-2 text-groupon-gray" />
                      <span>Limited time remaining</span>
                    </div>
                  )}
                  
                  {deal.sold && (
                    <div className="flex items-center text-sm mb-2">
                      <Info size={14} className="mr-2 text-groupon-gray" />
                      <span><b>{deal.sold}+</b> already bought</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-1 border border-gray-300 rounded-l-md"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          setQuantity(value);
                        }
                      }}
                      className="w-12 text-center py-1 border-t border-b border-gray-300"
                      min="1"
                    />
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-1 border border-gray-300 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-groupon-green hover:bg-groupon-green/90"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-groupon-blue text-groupon-blue hover:bg-groupon-blue/10"
                  >
                    Gift This Deal
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Related Deals */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
              <h3 className="font-semibold mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {relatedDeals.slice(0, 3).map(related => (
                  <div key={related.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <Link to={`/deal/${related.id}`} className="flex-shrink-0 w-20 h-20">
                      <img 
                        src={related.imageUrl} 
                        alt={related.title} 
                        className="w-full h-full object-cover rounded"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/deal/${related.id}`} className="block">
                        <h4 className="font-medium text-sm line-clamp-2 hover:text-groupon-blue transition-colors">
                          {related.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-groupon-gray mb-1">{related.merchant}</p>
                      <div className="flex items-center">
                        <span className="price-tag text-sm mr-2">
                          ${related.currentPrice.toFixed(2)}
                        </span>
                        {related.originalPrice > related.currentPrice && (
                          <span className="original-price text-xs">
                            ${related.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
