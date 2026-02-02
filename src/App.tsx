import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Apropos from "./pages/Apropos";
import Formations from "./pages/Formations";
import Services from "./pages/Services";
import ActualitesPage from "./pages/ActualitesPage";
import ActualiteDetail from "./pages/ActualiteDetail";
import ConseilsPage from "./pages/ConseilsPage";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import RendezVous from "./pages/RendezVous";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/apropos" element={<Apropos />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/services" element={<Services />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:id" element={<ActualiteDetail />} />
            <Route path="/conseils" element={<ConseilsPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
