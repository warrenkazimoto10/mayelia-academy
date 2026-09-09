import { Link } from 'react-router-dom';
import {
  Newspaper,
  Lightbulb,
  GraduationCap,
  Handshake,
  ArrowRight,
  Settings,
  MessageSquareText,
  Images,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const cards = [
  {
    title: 'Actualités',
    description: 'Articles, événements et nouvelles de l’académie.',
    to: '/admin/actualites',
    icon: Newspaper,
    accent: 'border-l-4 border-l-orange-500',
  },
  {
    title: 'Conseils',
    description: 'Articles conseils carrière et métiers.',
    to: '/admin/conseils',
    icon: Lightbulb,
    accent: 'border-l-4 border-l-violet-500',
  },
  {
    title: 'Formations',
    description: 'Domaines et programmes affichés sur la page Formations.',
    to: '/admin/formations',
    icon: GraduationCap,
    accent: 'border-l-4 border-l-emerald-500',
  },
  {
    title: 'Slider accueil',
    description: 'Carrousel plein écran sous le menu (images, textes, liens).',
    to: '/admin/accueil-slider',
    icon: Images,
    accent: 'border-l-4 border-l-rose-500',
  },
  {
    title: 'Partenaires',
    description: 'Logos « Ils nous font confiance » (accueil, à propos).',
    to: '/admin/partenaires',
    icon: Handshake,
    accent: 'border-l-4 border-l-sky-500',
  },
  {
    title: 'Réglages du site',
    description: 'Contact, adresse, réseaux sociaux, SEO et textes institutionnels.',
    to: '/admin/reglages',
    icon: Settings,
    accent: 'border-l-4 border-l-slate-600',
  },
  {
    title: 'Messages contact',
    description: 'Formulaire public : lire, marquer lu / supprimer ; e-mail reçu sur la boîte des réglages.',
    to: '/admin/messages',
    icon: MessageSquareText,
    accent: 'border-l-4 border-l-amber-500',
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-2">Tableau de bord</h1>
        <p className="text-slate-600 font-opensans">
          Gérez le contenu affiché sur le site public lorsque l’API est connectée.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <Link key={c.to} to={c.to} className="group block">
            <Card
              className={`border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300 ${c.accent}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-slate-50 border border-slate-100 transition-transform duration-300 group-hover:scale-105">
                  <c.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-poppins font-bold text-slate-900 flex items-center gap-2">
                    {c.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </h2>
                  <p className="text-sm text-slate-600 font-opensans mt-2 leading-relaxed">{c.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
