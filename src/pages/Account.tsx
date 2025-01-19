import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderHistory } from "@/components/account/OrderHistory";
import { AddressBook } from "@/components/account/AddressBook";
import { AccountSettings } from "@/components/account/AccountSettings";
import { Wishlist } from "@/components/account/Wishlist";
import { medusa } from "@/lib/medusa";

export default function Account() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching customer orders...");
        const response = await medusa.customers.listOrders();
        console.log("Orders fetched:", response);
        setOrders(response.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderHistory orders={orders} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Address Book</CardTitle>
            </CardHeader>
            <CardContent>
              <AddressBook />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              <Wishlist />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}