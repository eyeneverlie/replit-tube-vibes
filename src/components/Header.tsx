
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Menu, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu size={20} />
            </Button>
          )}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-youtube-red">
              Tube<span className="font-normal">Vibes</span>
            </div>
          </div>
        </div>

        <div className={cn("flex-grow max-w-3xl mx-4", isMobile && "hidden")}>
          <div className="relative flex w-full">
            <Input
              type="text"
              placeholder="Search"
              className="w-full rounded-r-none border-r-0"
            />
            <Button
              variant="outline"
              className="rounded-l-none border-l-0 bg-gray-100 hover:bg-gray-200"
            >
              <Search size={18} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isMobile && (
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
          )}
          <Button
            onClick={onUploadClick}
            variant="ghost"
            size={isMobile ? "icon" : "default"}
            className={cn(
              !isMobile && "bg-youtube-red hover:bg-red-700 text-white"
            )}
          >
            {isMobile ? (
              <Upload size={20} />
            ) : (
              <>
                <Upload size={18} className="mr-2" />
                Upload
              </>
            )}
          </Button>
          {!isMobile && (
            <>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
