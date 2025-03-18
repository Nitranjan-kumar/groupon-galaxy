
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import ProfileSettings from '@/components/profile/ProfileSettings';
import OrderHistory from '@/components/profile/OrderHistory';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-groupon-green border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Account</CardTitle>
          <CardDescription>
            Manage your account settings and view your purchase history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="settings">Profile Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="settings">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
