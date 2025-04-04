
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Custom Head Component for injecting scripts and custom code
const CustomHead = () => {
  useEffect(() => {
    // Google Tag Manager
    const gtmId = localStorage.getItem("gtmId");
    if (gtmId) {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);
      
      // GTM noscript iframe
      const gtmNoScript = document.createElement("noscript");
      const gtmIframe = document.createElement("iframe");
      gtmIframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      gtmIframe.height = "0";
      gtmIframe.width = "0";
      gtmIframe.style.display = "none";
      gtmIframe.style.visibility = "hidden";
      gtmNoScript.appendChild(gtmIframe);
      document.body.prepend(gtmNoScript);
    }

    // Custom code
    const customCode = localStorage.getItem("customHeadCode");
    if (customCode) {
      const customScript = document.createElement("div");
      customScript.innerHTML = customCode;
      
      // Extract and execute scripts
      const scripts = customScript.querySelectorAll("script");
      scripts.forEach(script => {
        const newScript = document.createElement("script");
        
        // Copy all attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        newScript.textContent = script.textContent;
        document.head.appendChild(newScript);
      });
      
      // Add any other HTML elements
      Array.from(customScript.children).forEach(child => {
        if (child.tagName !== "SCRIPT") {
          document.head.appendChild(child);
        }
      });
    }

    return () => {
      // Clean up function if needed
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomHead />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
