import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { UserRolesManager } from "@/components/admin/UserRolesManager";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });

      if (error) {
        console.error('Error checking admin status:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not verify admin status",
        });
        navigate('/');
        return;
      }

      if (!data) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access this page",
        });
        navigate('/');
        return;
      }

      setIsAdmin(data);
    };

    checkAdminStatus();
  }, [navigate, toast]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="users">User Roles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <ProductsManager />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <OrdersManager />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <CategoriesManager />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <UserRolesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;