import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AddressForm } from "./address/AddressForm";

interface AddressFormModalProps {
  onSubmit: (address: any) => void;
  isLoading?: boolean;
}

export function AddressFormModal({ onSubmit, isLoading }: AddressFormModalProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add New Address</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Address</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <AddressForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </SheetContent>
    </Sheet>
  );
}