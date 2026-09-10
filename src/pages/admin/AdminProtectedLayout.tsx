import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Lightbulb,
  GraduationCap,
  Handshake,
  HelpCircle,
  Award,
  LogOut,
  Menu,
  Settings,
  MessageSquareText,
  Images,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { adminApi, type AdminModule } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { canAccessModule, clearAdminToken, getAdminToken, getAdminUser, isSuperAdmin, setAdminUser } from './adminSession';
import { SEO } from '@/components/SEO';
import { cn } from '@/lib/utils';

const SIDEBAR_COLLAPSED_KEY = 'admin-sidebar-collapsed';

const nav: { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean; module?: AdminModule; superAdminOnly?: boolean }[] = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/actualites', label: 'Actualités', icon: Newspaper, module: 'actualites' },
  { to: '/admin/conseils', label: 'Conseils', icon: Lightbulb, module: 'conseils' },
  { to: '/admin/formations', label: 'Formations', icon: GraduationCap, module: 'formations' },
  { to: '/admin/accueil-slider', label: 'Slider accueil', icon: Images, module: 'accueil-slider' },
  { to: '/admin/partenaires', label: 'Partenaires', icon: Handshake, module: 'partenaires' },
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle, module: 'faq' },
  { to: '/admin/certificats', label: 'Certificats', icon: Award, module: 'certificats' },
  { to: '/admin/reglages', label: 'Réglages site', icon: Settings, module: 'reglages' },
  { to: '/admin/messages', label: 'Messages contact', icon: MessageSquareText, module: 'messages' },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users, superAdminOnly: true },
];

/** Segment de route /admin/<segment> → module requis (pour bloquer l'accès direct par URL). */
const moduleByPathSegment: Record<string, AdminModule> = {
  actualites: 'actualites',
  conseils: 'conseils',
  formations: 'formations',
  'accueil-slider': 'accueil-slider',
  partenaires: 'partenaires',
  faq: 'faq',
  certificats: 'certificats',
  reglages: 'reglages',
  messages: 'messages',
};

const AdminProtectedLayout = () => {
  const token = getAdminToken();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Sessions ouvertes avant l'ajout des permissions : pas encore d'utilisateur en cache.
  const [userLoaded, setUserLoaded] = useState(() => getAdminUser() !== null);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {
      // stockage indisponible (navigation privée…) — pas bloquant
    }
  }, [collapsed]);

  useEffect(() => {
    if (userLoaded || !token) return;
    adminApi
      .ping(token)
      .then((res) => {
        if (res.user) setAdminUser(res.user);
        setUserLoaded(true);
      })
      .catch(() => {
        clearAdminToken();
        window.location.href = '/admin/login';
      });
  }, [userLoaded, token]);

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!userLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const superAdmin = isSuperAdmin();
  const visibleNav = nav.filter((item) => {
    if (item.superAdminOnly) return superAdmin;
    if (item.module) return superAdmin || canAccessModule(item.module);
    return true;
  });

  // Blocage de l'accès direct par URL à un module non autorisé.
  const segment = location.pathname.replace(/^\/admin\/?/, '').split('/')[0];
  if (segment === 'utilisateurs' && !superAdmin) {
    return <Navigate to="/admin" replace />;
  }
  const requiredModule = moduleByPathSegment[segment];
  if (requiredModule && !superAdmin && !canAccessModule(requiredModule)) {
    return <Navigate to="/admin" replace />;
  }

  const NavLinks = ({ onNavigate, iconOnly = false }: { onNavigate?: () => void; iconOnly?: boolean }) => (
    <nav className="flex flex-col gap-1 p-4">
      {visibleNav.map((item) => {
        const active = item.end
          ? location.pathname === item.to
          : location.pathname === item.to || location.pathname.startsWith(item.to + '/');
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={iconOnly ? item.label : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl py-3 text-sm font-opensans font-semibold transition-colors',
              iconOnly ? 'justify-center px-0' : 'px-4',
              active ? 'bg-primary text-primary-foreground shadow-md' : 'text-slate-700 hover:bg-slate-100'
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!iconOnly && item.label}
          </Link>
        );
      })}
      <Button
        variant="ghost"
        title={iconOnly ? 'Déconnexion' : undefined}
        className={cn(
          'mt-6 text-red-600 hover:text-red-700 hover:bg-red-50',
          iconOnly ? 'justify-center px-0' : 'justify-start gap-3'
        )}
        onClick={() => {
          clearAdminToken();
          onNavigate?.();
          window.location.href = '/admin/login';
        }}
      >
        <LogOut className="w-5 h-5" />
        {!iconOnly && 'Déconnexion'}
      </Button>
    </nav>
  );

  return (
    <div className="fixed inset-0 flex bg-slate-100 text-slate-900 overflow-hidden">
      <SEO title="Administration" description="Gestion du contenu Mayelia Academy" canonical="/admin" />
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-slate-200 bg-white shadow-sm h-full shrink-0 overflow-y-auto transition-[width] duration-200',
          collapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        <div className={cn('flex items-center border-b border-slate-200 gap-2', collapsed ? 'justify-center p-4' : 'justify-between p-6')}>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-poppins font-bold text-lg text-slate-900">Mayelia CMS</p>
              <p className="text-xs text-slate-500 mt-1 font-opensans">Contenu site — mode clair</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? 'Déplier le menu' : 'Réduire le menu'}
          >
            {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>
        </div>
        <NavLinks iconOnly={collapsed} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm shrink-0">
          <span className="font-poppins font-bold text-slate-900">Mayelia Admin</span>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-slate-200">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-white border-slate-200 p-0">
              <div className="p-6 border-b border-slate-200">
                <p className="font-poppins font-bold text-slate-900">Menu</p>
              </div>
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 min-h-0 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProtectedLayout;
