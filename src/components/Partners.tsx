const Partners = () => {
  const partners = [
    { name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg' },
    { name: 'Canal+', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Canal%2B.svg' },
    { name: 'NSIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/NSIA_logo.svg' },
    { name: 'Sodexo', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Sodexo_logo.svg' },
    { name: 'Axian Group', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Axian_logo.svg' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/5 via-background to-primary/5 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-2">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted-foreground font-opensans">
            Partenaires de choix pour l'excellence de nos formations
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-6 rounded-xl bg-background border border-border hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;



