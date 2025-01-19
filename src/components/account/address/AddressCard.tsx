import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AddressCardProps {
  address: {
    id: string;
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    province: string;
    postal_code: string;
    country_code: string;
  };
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function AddressCard({ address, onDelete, isDeleting }: AddressCardProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">
            {address.first_name} {address.last_name}
          </p>
          <p>{address.address_1}</p>
          {address.address_2 && <p>{address.address_2}</p>}
          <p>
            {address.city}, {address.province} {address.postal_code}
          </p>
          <p>{address.country_code}</p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(address.id)}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}