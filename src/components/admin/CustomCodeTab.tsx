
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Code } from "lucide-react";

interface CustomCodeTabProps {
  customHeadCode: string;
  setCustomHeadCode: (code: string) => void;
  saveCustomCode: () => void;
}

const CustomCodeTab: React.FC<CustomCodeTabProps> = ({ 
  customHeadCode, 
  setCustomHeadCode,
  saveCustomCode
}) => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h2 className="text-lg font-medium mb-4">Custom Code</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="custom-code" className="block mb-2">Custom Head Code</Label>
          <Textarea
            id="custom-code"
            placeholder="<!-- Add your custom HTML, CSS, or JavaScript here -->"
            className="font-mono text-sm h-48"
            value={customHeadCode}
            onChange={(e) => setCustomHeadCode(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Add custom code that will be injected into the &lt;head&gt; section of your site.
          </p>
        </div>
        <Button onClick={saveCustomCode}>
          <Code className="h-4 w-4 mr-2" /> Save Custom Code
        </Button>
      </div>
    </div>
  );
};

export default CustomCodeTab;
