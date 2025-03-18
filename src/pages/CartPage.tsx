
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingCart, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice 
  } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Promo code applied",
      description: `Discount code "${promoCode}" has been applied to your order.`,
    });
    setPromoCode('');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      toast({
        title: "Order completed",
        description: "Thank you for your purchase! Your deals will be emailed to you shortly.",
      });
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-groupon-lightGray pb-10">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.deal.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b">
                        <div className="sm:w-24 sm:h-24 flex-shrink-0">
                          <img 
                            src={item.deal.imageUrl} 
                            alt={item.deal.title} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <Link 
                            to={`/deal/${item.deal.id}`}
                            className="font-semibold hover:text-groupon-blue transition-colors"
                          >
                            {item.deal.title}
                          </Link>
                          <p className="text-sm text-groupon-gray mb-2">{item.deal.merchant}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateQuantity(item.deal.id, item.quantity - 1)}
                                className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.deal.id, item.quantity + 1)}
                                className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.deal.id)}
                              className="text-groupon-gray hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="price-tag">
                            ${(item.deal.currentPrice * item.quantity).toFixed(2)}
                          </p>
                          {item.deal.originalPrice > item.deal.currentPrice && (
                            <p className="original-price text-sm">
                              ${(item.deal.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 px-6 py-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Link to="/" className="text-groupon-blue hover:underline text-sm">
                    Continue Shopping
                  </Link>
                </CardFooter>
              </Card>

              {/* Promo Code */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Have a promo code?</h3>
                  <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button type="submit" variant="outline">Apply</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 font-bold flex justify-between">
                      <span>Total</span>
                      <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-3">
                        Proceed to Checkout
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Your Purchase</DialogTitle>
                        <DialogDescription>
                          Enter your payment details to complete your order.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Contact Information</h3>
                          <Input placeholder="Email" type="email" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Payment Details</h3>
                          <div className="grid grid-cols-1 gap-3">
                            <Input placeholder="Card Number" />
                            <div className="grid grid-cols-2 gap-3">
                              <Input placeholder="MM/YY" />
                              <Input placeholder="CVC" />
                            </div>
                            <Input placeholder="Cardholder Name" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                          className="w-full"
                        >
                          {isCheckingOut ? (
                            <>
                              Processing... 
                              <div className="ml-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            </>
                          ) : (
                            <>
                              Complete Purchase <ArrowRight size={16} className="ml-2" />
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="text-xs text-center text-groupon-gray">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="p-1 border rounded">Visa</div>
                    <div className="p-1 border rounded">Mastercard</div>
                    <div className="p-1 border rounded">Amex</div>
                    <div className="p-1 border rounded">PayPal</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-2xl mx-auto">
            <div className="text-groupon-gray mb-4">
              <ShoppingCart size={64} className="mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-groupon-gray mb-6">
              Looks like you haven't added any deals to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/">Discover Great Deals</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
