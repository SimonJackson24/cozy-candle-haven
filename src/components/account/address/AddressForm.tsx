import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddressFormProps {
  onSubmit: (address: any) => void;
  isLoading?: boolean;
}

export function AddressForm({ onSubmit, isLoading }: AddressFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    province: "",
    postal_code: "",
    country_code: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_1">Address Line 1</Label>
        <Input
          id="address_1"
          name="address_1"
          value={formData.address_1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_2">Address Line 2 (Optional)</Label>
        <Input
          id="address_2"
          name="address_2"
          value={formData.address_2}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">State/Province</Label>
          <Input
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country_code">Country Code</Label>
          <Input
            id="country_code"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            required
            placeholder="e.g., US"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Address"}
      </Button>
    </form>
  );
}