import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { vendureClient } from "@/lib/vendure-client";
import { gql } from "@apollo/client";

export function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Requesting password reset for:", email);
      await vendureClient.mutate({
        mutation: gql`
          mutation RequestPasswordReset($email: String!) {
            requestPasswordReset(emailAddress: $email)
          }
        `,
        variables: { email },
      });
      
      console.log("Password reset token generated successfully");
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions",
      });
      setEmail("");
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Reset Password"}
      </Button>
    </form>
  );
}