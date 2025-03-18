
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Deal } from '@/types/deal';
import { useCart } from '@/hooks/useCart';

interface BuyNowButtonProps {
  deal: Deal;
  quantity: number;
  className?: string;
}

const BuyNowButton = ({ deal, quantity, className }: BuyNowButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToCart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    setIsProcessing(true);
    
    try {
      // Clear the cart and add only this item
      clearCart();
      addToCart(deal, quantity);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to checkout
      navigate('/cart');
      
    } catch (error) {
      console.error('Error processing buy now:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button 
      onClick={handleBuyNow}
      disabled={isProcessing}
      className={className}
    >
      {isProcessing ? "Processing..." : "Buy Now"}
    </Button>
  );
};

export default BuyNowButton;
