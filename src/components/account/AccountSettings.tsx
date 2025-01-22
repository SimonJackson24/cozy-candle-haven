import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { customerService } from "@/lib/vendure-client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function AccountSettings() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer-profile"],
    queryFn: async () => {
      console.log("Fetching customer profile...");
      const { customer } = await customerService.retrieve();
      console.log("Customer profile fetched:", customer);
      return customer;
    },
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        email: customer.email || "",
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        phone: customer.phone || "",
      });
    }
  }, [customer]);

  const updateCustomerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      console.log("Updating customer profile:", data);
      const response = await customerService.update(data);
      console.log("Customer profile updated:", response);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      
      <Button type="submit" disabled={updateCustomerMutation.isPending}>
        {updateCustomerMutation.isPending ? "Updating..." : "Update Settings"}
      </Button>
    </form>
  );
}
