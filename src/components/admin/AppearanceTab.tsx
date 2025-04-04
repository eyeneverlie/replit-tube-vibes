
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Type, ImageIcon } from "lucide-react";

interface AppearanceTabProps {
  siteName: string;
  setSiteName: (name: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  setLogoFile: (file: File | null) => void;
  saveSiteName: () => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({
  siteName,
  setSiteName,
  logoUrl,
  setLogoUrl,
  setLogoFile,
  saveSiteName
}) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setLogoUrl(objectUrl);
      localStorage.setItem("customLogo", objectUrl);
      toast.success("Logo updated successfully");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <h2 className="text-lg font-medium mb-4">Customize Appearance</h2>
      
      <div className="space-y-6">
        <div className="mb-6">
          <Label htmlFor="siteName" className="block mb-2">Website Name</Label>
          <div className="flex items-end space-x-4">
            <div className="flex-grow">
              <Input
                id="siteName"
                placeholder="Enter website name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                This name will be displayed in the header instead of "TubeVibes"
              </p>
            </div>
            <Button onClick={saveSiteName}>
              <Type className="h-4 w-4 mr-2" /> Save Name
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="logo" className="block mb-2">Site Logo</Label>
          <div className="flex flex-col space-y-4">
            {logoUrl && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Current Logo:</p>
                <img 
                  src={logoUrl} 
                  alt="Custom Logo" 
                  className="h-12 object-contain bg-gray-100 rounded p-2" 
                />
              </div>
            )}
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <ImageIcon className="h-4 w-4 mr-2" /> Choose Logo
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              {logoUrl && (
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setLogoUrl("");
                    localStorage.removeItem("customLogo");
                    toast.info("Logo removed");
                  }}
                >
                  Remove Logo
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
