import logoMayeliaAcademy from '@/assets/partenaire/LOGO-MAYELIA-ACADEMY.png';
import logoMayeliaAutomotive from '@/assets/partenaire/LOGO-MAYELIA-AUTOMOTIVE.png';
import logoMayeliaParticipations from '@/assets/partenaire/LOGO-MAYELIA-PARTICIPATIONS.png';
import logoCieria from '@/assets/partenaire/cieria.png';
import logoSicta from '@/assets/partenaire/sicta.png';
import logoEmploiJeune from '@/assets/partenaire/emploi-jeune.png';
import logoLaTulipe from '@/assets/partenaire/la-tulipe.png';
import logoLra from '@/assets/partenaire/lra.png';
import logoNeemba from '@/assets/partenaire/neemba.png';
import logoSst from '@/assets/partenaire/sst.png';

const Partners = () => {
  const partners = [
    { name: 'Mayelia Academy', logo: logoMayeliaAcademy },
    { name: 'Mayelia Automotive', logo: logoMayeliaAutomotive },
    { name: 'Mayelia Participations', logo: logoMayeliaParticipations },
    { name: 'Cieria', logo: logoCieria },
    { name: 'Sicta', logo: logoSicta },
    { name: 'Emploi Jeune', logo: logoEmploiJeune },
    { name: 'La Tulipe', logo: logoLaTulipe },
    { name: 'LRA', logo: logoLra },
    { name: 'Neemba', logo: logoNeemba },
    { name: 'SST', logo: logoSst },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] -skew-x-12"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            Ils nous font <span className="text-primary italic">confiance</span>
          </h2>
          <div className="w-12 h-1 bg-primary/30 mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground font-opensans leading-relaxed">
            Collaborer avec des leaders pour offrir des formations d'excellence alignées sur les exigences du marché.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 md:gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group relative flex items-center justify-center h-32 p-6 rounded-2xl bg-white hover:bg-white transition-all duration-500 border border-border/50 hover:border-primary/20 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>

              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="relative z-10 h-auto max-h-16 w-full object-contain transition-all duration-500 transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;



