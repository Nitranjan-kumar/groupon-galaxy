
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-groupon-lightGray flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="text-5xl font-bold text-groupon-blue">
            4<span className="text-groupon-green">0</span>4
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        
        <p className="text-groupon-gray mb-6">
          Oops! The deal you're looking for has expired or moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home size={18} className="mr-2" />
              Return Home
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/category/all">
              <Search size={18} className="mr-2" />
              Browse Deals
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
