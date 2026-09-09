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
import ConseilDetail from "./pages/ConseilDetail";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import RendezVous from "./pages/RendezVous";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProtectedLayout from "./pages/admin/AdminProtectedLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminActualitesPage from "./pages/admin/AdminActualitesPage";
import AdminActualiteEditPage from "./pages/admin/AdminActualiteEditPage";
import AdminConseilsPage from "./pages/admin/AdminConseilsPage";
import AdminConseilEditPage from "./pages/admin/AdminConseilEditPage";
import AdminFormationsPage from "./pages/admin/AdminFormationsPage";
import AdminFormationDomainPage from "./pages/admin/AdminFormationDomainPage";
import AdminPartnersPage from "./pages/admin/AdminPartnersPage";
import AdminPartnerEditPage from "./pages/admin/AdminPartnerEditPage";
import AdminSiteSettingsPage from "./pages/admin/AdminSiteSettingsPage";
import AdminContactMessagesPage from "./pages/admin/AdminContactMessagesPage";
import AdminHeroSlidesPage from "./pages/admin/AdminHeroSlidesPage";
import AdminFAQsPage from "./pages/admin/AdminFAQsPage";
import AdminFAQEditPage from "./pages/admin/AdminFAQEditPage";
import AdminCertTrainingsPage from "./pages/admin/AdminCertTrainingsPage";
import AdminCertTrainingEditPage from "./pages/admin/AdminCertTrainingEditPage";
import AdminCertTrainingDetailPage from "./pages/admin/AdminCertTrainingDetailPage";
import AdminCertParticipantsPage from "./pages/admin/AdminCertParticipantsPage";
import AdminCertParticipantEditPage from "./pages/admin/AdminCertParticipantEditPage";
import AdminCertificatesPage from "./pages/admin/AdminCertificatesPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUserEditPage from "./pages/admin/AdminUserEditPage";
import CertificateVerification from "./pages/CertificateVerification";
import CertificateLookup from "./pages/CertificateLookup";
import CertificateWidget from "./components/CertificateWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CertificateWidget />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/apropos" element={<Apropos />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/services" element={<Services />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:id" element={<ActualiteDetail />} />
            <Route path="/conseils" element={<ConseilsPage />} />
            <Route path="/conseils/:id" element={<ConseilDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/verification" element={<CertificateLookup />} />
            <Route path="/verification/:ref" element={<CertificateVerification />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProtectedLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="actualites" element={<AdminActualitesPage />} />
              <Route path="actualites/:id" element={<AdminActualiteEditPage />} />
              <Route path="conseils" element={<AdminConseilsPage />} />
              <Route path="conseils/:id" element={<AdminConseilEditPage />} />
              <Route path="formations/domain/:domainSlug" element={<AdminFormationDomainPage />} />
              <Route path="formations" element={<AdminFormationsPage />} />
              <Route path="partenaires" element={<AdminPartnersPage />} />
              <Route path="partenaires/:id" element={<AdminPartnerEditPage />} />
              <Route path="accueil-slider" element={<AdminHeroSlidesPage />} />
              <Route path="faq" element={<AdminFAQsPage />} />
              <Route path="faq/:id" element={<AdminFAQEditPage />} />
              <Route path="certificats" element={<AdminCertTrainingsPage />} />
              <Route path="certificats/liste" element={<AdminCertificatesPage />} />
              <Route path="certificats/participants" element={<AdminCertParticipantsPage />} />
              <Route path="certificats/participants/:id" element={<AdminCertParticipantEditPage />} />
              <Route path="certificats/formations/nouveau" element={<AdminCertTrainingEditPage />} />
              <Route path="certificats/formations/:id" element={<AdminCertTrainingDetailPage />} />
              <Route path="certificats/formations/:id/modifier" element={<AdminCertTrainingEditPage />} />
              <Route path="utilisateurs" element={<AdminUsersPage />} />
              <Route path="utilisateurs/:id" element={<AdminUserEditPage />} />
              <Route path="reglages" element={<AdminSiteSettingsPage />} />
              <Route path="messages" element={<AdminContactMessagesPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
