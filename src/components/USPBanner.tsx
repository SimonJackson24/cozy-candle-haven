import { UserMenu } from "./UserMenu";

export const USPBanner = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          Free shipping on orders over $50 | Handcrafted with love
        </div>
        <UserMenu />
      </div>
    </div>
  );
};