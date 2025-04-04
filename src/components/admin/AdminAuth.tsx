
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  // In a real app, this would be a secure environment variable or backend-validated
  const ADMIN_PASSWORD = "tubevibesdemo123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Store auth state
      if (rememberMe) {
        localStorage.setItem("adminAuthenticated", "true");
      } else {
        // For session only
        sessionStorage.setItem("adminAuthenticated", "true");
      }
      
      toast.success("Successfully logged in to admin panel");
      onAuthenticated();
    } else {
      setIsIncorrect(true);
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-youtube-lightGray p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="text-gray-500 mt-2">Enter your password to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsIncorrect(false);
              }}
              className={isIncorrect ? "border-red-500" : ""}
              autoFocus
            />
            {isIncorrect && (
              <p className="text-red-500 text-sm">Incorrect password</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Login to Admin Panel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
