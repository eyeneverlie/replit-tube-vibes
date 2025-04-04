
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Menu, Bell, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

interface HeaderProps {
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
  const isMobile = useIsMobile();
  const customLogo = localStorage.getItem("customLogo");
  const siteName = localStorage.getItem("siteName") || "TubeVibes";

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu size={20} />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            {customLogo ? (
              <img 
                src={customLogo} 
                alt={siteName} 
                className="h-8 object-contain mr-2" 
              />
            ) : (
              <div className="text-2xl font-bold text-youtube-red">
                {siteName === "TubeVibes" ? (
                  <>
                    Tube<span className="font-normal">Vibes</span>
                  </>
                ) : (
                  siteName
                )}
              </div>
            )}
          </Link>
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
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </Link>
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
