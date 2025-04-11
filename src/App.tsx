
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { StrictMode } from "react";
import { ChatProvider } from "./components/chat/ChatProvider";

// Pages
import Dashboard from "./pages/Dashboard";
import CompanyProfile from "./pages/CompanyProfile";
import PolicyManagement from "./pages/PolicyManagement";
import ClaimProcessing from "./pages/ClaimProcessing";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
              <Route path="/profile" element={<MainLayout><CompanyProfile /></MainLayout>} />
              <Route path="/policies" element={<MainLayout><PolicyManagement /></MainLayout>} />
              <Route path="/claims" element={<MainLayout><ClaimProcessing /></MainLayout>} />
              <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
              <Route path="/documents" element={<MainLayout><Documents /></MainLayout>} />
              <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
