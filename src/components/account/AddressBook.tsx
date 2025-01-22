import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { customerService } from "@/lib/vendure-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressFormModal } from "./AddressFormModal";
import { AddressCard } from "./address/AddressCard";

export function AddressBook() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["customer-addresses"],
    queryFn: async () => {
      console.log("Fetching customer addresses...");
      const { customer } = await customerService.retrieve();
      console.log("Addresses fetched:", customer.addresses);
      return customer.addresses;
    },
  });

  const addAddressMutation = useMutation({
    mutationFn: async (address: any) => {
      console.log("Adding new address:", address);
      const response = await customerService.createAddress(address);
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
      const response = await customerService.deleteAddress(addressId);
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
        <AddressFormModal
          onSubmit={addAddressMutation.mutate}
          isLoading={addAddressMutation.isPending}
        />
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No addresses saved yet</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address: any) => (
            <AddressCard
              key={address.id}
              address={address}
              onDelete={deleteAddressMutation.mutate}
              isDeleting={deleteAddressMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
