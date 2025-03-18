
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

interface Purchase {
  id: string;
  deal_id: string;
  quantity: number;
  total_price: number;
  purchase_date: string;
  status: string;
  deal: {
    title: string;
    image_url: string;
    merchant_name: string;
  };
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchPurchases = async () => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('purchases')
      .select(`
        *,
        deal:deal_id (
          title,
          image_url,
          merchant_name
        )
      `)
      .eq('user_id', user.id)
      .order(sortBy === 'date' ? 'purchase_date' : 'total_price', { ascending: sortOrder === 'asc' });

    if (error) {
      throw new Error(error.message);
    }

    return data as Purchase[];
  };

  const { data: purchases, isLoading, error, refetch } = useQuery({
    queryKey: ['purchases', user?.id, sortBy, sortOrder],
    queryFn: fetchPurchases,
    enabled: !!user,
  });

  const toggleSort = (field: 'date' | 'price') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-groupon-green border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-groupon-gray">Loading your purchase history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500">Error loading your purchase history. Please try again later.</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!purchases || purchases.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-groupon-gray">You haven't made any purchases yet.</p>
        <Button asChild className="mt-4">
          <Link to="/">Browse Deals</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deal</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 font-medium"
                  onClick={() => toggleSort('date')}
                >
                  Date
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'date' ? 'text-groupon-blue' : 'text-groupon-gray'}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 font-medium"
                  onClick={() => toggleSort('price')}
                >
                  Price
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'price' ? 'text-groupon-blue' : 'text-groupon-gray'}`} />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {purchase.deal.image_url && (
                      <img 
                        src={purchase.deal.image_url} 
                        alt={purchase.deal.title} 
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{purchase.deal.title}</p>
                      <p className="text-sm text-groupon-gray">{purchase.deal.merchant_name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{new Date(purchase.purchase_date).toLocaleDateString()}</span>
                    <span className="text-sm text-groupon-gray">
                      {formatDistance(new Date(purchase.purchase_date), new Date(), { addSuffix: true })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>${purchase.total_price.toFixed(2)}</span>
                    <span className="text-sm text-groupon-gray">Qty: {purchase.quantity}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    purchase.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {purchase.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/deal/${purchase.deal_id}`}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Deal
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderHistory;
