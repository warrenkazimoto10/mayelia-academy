import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface FormationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  delay?: number;
}

const FormationCard = ({ title, description, icon, image, delay = 0 }: FormationCardProps) => {
  return (
    <Card
      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in border-border hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute top-4 right-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
          {icon}
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-poppins font-bold text-white mb-1">
            {title}
          </h3>
        </div>
      </div>
      
      <CardContent className="p-6">
        <p className="text-muted-foreground font-opensans text-sm leading-relaxed mb-6">
          {description}
        </p>
        <button className="text-primary font-opensans font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
          En savoir plus
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default FormationCard;
