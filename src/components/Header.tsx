
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  MapPin, 
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import LocationSelector from '@/components/LocationSelector';
import SearchPopover from '@/components/SearchPopover';
import { useLocation } from '@/hooks/useLocation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { location } = useLocation();
  const { user, profile, signOut } = useAuth();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-groupon-blue">
              <span className="text-groupon-green">G</span>roupon
            </h1>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:flex items-center text-groupon-gray mx-4">
            <LocationSelector />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchPopover />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 ml-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User size={18} />
                    {profile?.first_name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/purchases" className="w-full cursor-pointer">My Purchases</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved" className="w-full cursor-pointer">Saved Deals</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500 flex items-center gap-2 cursor-pointer">
                    <LogOut size={16} /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/signin">
                  <User size={18} className="mr-1" />
                  Sign In
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart" className="relative">
                <ShoppingCart size={18} className="mr-1" />
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-groupon-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden gap-4 items-center">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-groupon-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-6 mt-10">
                  {user ? (
                    <div className="space-y-4">
                      <div className="font-semibold">
                        Hello, {profile?.first_name || 'User'}
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 hover:text-groupon-blue transition-colors">
                        <User size={18} />
                        My Profile
                      </Link>
                      <Link to="/purchases" className="flex items-center gap-2 hover:text-groupon-blue transition-colors">
                        My Purchases
                      </Link>
                      <Link to="/saved" className="flex items-center gap-2 hover:text-groupon-blue transition-colors">
                        Saved Deals
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={signOut}
                        className="w-full flex items-center justify-center gap-2 text-red-500 mt-2"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/signin" className="flex items-center gap-2 hover:text-groupon-blue transition-colors">
                      <User size={18} />
                      Sign In
                    </Link>
                  )}
                  <div className="flex items-center gap-2 hover:text-groupon-blue transition-colors">
                    <MapPin size={18} />
                    <LocationSelector />
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="font-bold mb-2">Categories</h3>
                    {categories.map(category => (
                      <Link 
                        key={category.id} 
                        to={`/category/${category.id}`}
                        className="block py-2 hover:text-groupon-blue transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2 md:hidden">
          <SearchPopover mobile />
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 py-2 whitespace-nowrap">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="text-groupon-darkGray hover:text-groupon-blue font-medium text-sm transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

const categories = [
  { id: 'local', name: 'Local' },
  { id: 'travel', name: 'Travel' },
  { id: 'products', name: 'Products' },
  { id: 'restaurants', name: 'Restaurants' },
  { id: 'beauty', name: 'Beauty & Spas' },
  { id: 'activities', name: 'Activities' },
  { id: 'wellness', name: 'Health & Wellness' },
  { id: 'home', name: 'Home Services' },
  { id: 'auto', name: 'Automotive' },
];

export default Header;
