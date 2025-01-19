import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";

export function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const { toast } = useToast();

  const handleAddAddress = () => {
    // TODO: Implement add address functionality
    toast({
      title: "Coming Soon",
      description: "Address management will be available soon.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAddAddress}>Add New Address</Button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No addresses saved yet</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address: any) => (
            <Card key={address.id} className="p-4">
              <p className="font-medium">{address.first_name} {address.last_name}</p>
              <p>{address.address_1}</p>
              {address.address_2 && <p>{address.address_2}</p>}
              <p>{address.city}, {address.province} {address.postal_code}</p>
              <p>{address.country_code}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}