
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
  popularLocations: string[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string>('New York');

  // Load location from localStorage on initial render
  useEffect(() => {
    const savedLocation = localStorage.getItem('groupon-location');
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      // TODO: Could implement geolocation here
      setLocation('New York');
    }
  }, []);

  // Save location to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('groupon-location', location);
  }, [location]);

  const popularLocations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Francisco'
  ];

  return (
    <LocationContext.Provider value={{
      location,
      setLocation,
      popularLocations
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
