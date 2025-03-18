
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeaturedDeals from '@/components/FeaturedDeals';
import DealCard from '@/components/DealCard';
import { Deal } from '@/types/deal';
import { Category } from '@/data/categories';
import { 
  getDeals, 
  getFeaturedDeals, 
  getTrendingDeals 
} from '@/data/mockDeals';
import { 
  getFeaturedCategories 
} from '@/data/categories';

const Index = () => {
  const [featuredDeals, setFeaturedDeals] = useState<Deal[]>([]);
  const [trendingDeals, setTrendingDeals] = useState<Deal[]>([]);
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [featured, trending, deals, categories] = await Promise.all([
          getFeaturedDeals(),
          getTrendingDeals(),
          getDeals(),
          getFeaturedCategories()
        ]);
        
        setFeaturedDeals(featured);
        setTrendingDeals(trending);
        setAllDeals(deals);
        setFeaturedCategories(categories);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-groupon-lightGray">
      {/* Hero Section */}
      <section className="bg-groupon-blue text-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Save on the Best Things to do in Your City
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Discover local deals, travel packages, and unique experiences at incredible prices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-groupon-blue hover:bg-gray-100">
                <Link to="/category/local">Explore Local Deals</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/category/travel">Travel Deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredCategories.map(category => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {category.imageUrl && (
                  <div className="aspect-video">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-groupon-gray mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-groupon-blue"></div>
            </div>
          ) : (
            <FeaturedDeals 
              title="Featured Deals" 
              deals={featuredDeals} 
              viewAllLink="/category/all"
            />
          )}
        </div>
      </section>

      {/* Trending Deals */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-groupon-blue"></div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Trending Now</h2>
                <Link 
                  to="/category/all" 
                  className="text-groupon-blue hover:underline flex items-center text-sm font-medium"
                >
                  View All <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-10 bg-groupon-lightGray">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Get the Best Deals First</h2>
              <p className="text-groupon-gray">Subscribe to our newsletter and never miss out on exclusive offers.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-groupon-blue"
              />
              <Button className="bg-groupon-blue">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Download the Groupon App</h2>
              <p className="text-groupon-gray mb-4">Get deals on the go with the Groupon mobile app.</p>
              <div className="flex gap-4">
                <Button variant="outline">
                  App Store
                </Button>
                <Button variant="outline">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 max-w-xs">
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80" 
                alt="Groupon App" 
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
