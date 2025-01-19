import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function AddressBook() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["customer-addresses"],
    queryFn: async () => {
      console.log("Fetching customer addresses...");
      const response = await medusa.customers.addresses.list();
      console.log("Addresses fetched:", response.addresses);
      return response.addresses;
    },
  });

  const addAddressMutation = useMutation({
    mutationFn: async (address: any) => {
      console.log("Adding new address:", address);
      const response = await medusa.customers.addresses.addAddress({
        address: address,
      });
      console.log("Address added:", response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-addresses"] });
      toast({
        title: "Success",
        description: "Address added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding address:", error);
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      console.log("Deleting address:", addressId);
      const response = await medusa.customers.addresses.deleteAddress(addressId);
      console.log("Address deleted:", response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-addresses"] });
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting address:", error);
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => {
          // TODO: Implement address form modal
          toast({
            title: "Coming Soon",
            description: "Address form will be available soon.",
          });
        }}>
          Add New Address
        </Button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No addresses saved yet</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address: any) => (
            <Card key={address.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{address.first_name} {address.last_name}</p>
                  <p>{address.address_1}</p>
                  {address.address_2 && <p>{address.address_2}</p>}
                  <p>{address.city}, {address.province} {address.postal_code}</p>
                  <p>{address.country_code}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteAddressMutation.mutate(address.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}