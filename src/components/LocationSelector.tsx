
import { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/useLocation';

const LocationSelector = () => {
  const { location, setLocation, popularLocations } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSelectLocation = (loc: string) => {
    setLocation(loc);
    setIsOpen(false);
  };
  
  const filteredLocations = searchTerm 
    ? popularLocations.filter(loc => 
        loc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : popularLocations;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center text-groupon-gray hover:text-groupon-blue"
        >
          <MapPin size={18} className="mr-1" />
          <span className="text-sm">{location}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search for a city"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-4 w-4 text-gray-500"
                onClick={() => setSearchTerm('')}
              >
                <X size={14} />
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Popular Cities</h4>
            <div className="grid grid-cols-2 gap-2">
              {filteredLocations.map((loc) => (
                <Button
                  key={loc}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSelectLocation(loc)}
                >
                  <MapPin size={14} className="mr-2" />
                  {loc}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelector;
