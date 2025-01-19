import { useEffect } from "react";
import { UserMenu } from "@/components/UserMenu";
import { Hero } from "@/components/Hero";
import { Collections } from "@/components/Collections";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { CandleCare } from "@/components/CandleCare";
import { Sustainability } from "@/components/Sustainability";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Your user ID is:", user?.id);
    };
    
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-4">
          <UserMenu />
        </div>
        <Hero />
        <Collections />
        <FeaturedProducts />
        <Benefits />
        <Testimonials />
        <CandleCare />
        <Sustainability />
        <Footer />
      </div>
    </div>
  );
};

export default Index;