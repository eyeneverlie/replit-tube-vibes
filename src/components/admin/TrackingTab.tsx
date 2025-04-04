
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TrackingTabProps {
  gtmId: string;
  setGtmId: (id: string) => void;
  saveGTM: () => void;
}

const TrackingTab: React.FC<TrackingTabProps> = ({ 
  gtmId, 
  setGtmId,
  saveGTM
}) => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h2 className="text-lg font-medium mb-4">Tracking & Analytics</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="gtm" className="block mb-2">Google Tag Manager ID</Label>
          <div className="flex items-end space-x-4">
            <div className="flex-grow">
              <Input
                id="gtm"
                placeholder="GTM-XXXXXX"
                value={gtmId}
                onChange={(e) => setGtmId(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your GTM container ID (e.g., GTM-XXXXXX)
              </p>
            </div>
            <Button onClick={saveGTM}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingTab;
