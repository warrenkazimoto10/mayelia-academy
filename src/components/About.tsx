import { CheckCircle2, Users, TrendingUp, Award, MonitorPlay, Target } from 'lucide-react';
import aboutImage from '@/assets/formationn.jpg';
import logo from '@/assets/logo_mayelia.png';

const About = () => {
    const features = [
        {
            icon: <TrendingUp className="w-5 h-5 text-primary" />,
            text: "Mise à jour continue des compétences pour le développement professionnel"
        },
        {
            icon: <Target className="w-5 h-5 text-primary" />,
            text: "Programmes alignés sur les besoins actuels du marché"
        },
        {
            icon: <Users className="w-5 h-5 text-primary" />,
            text: "Formateurs qualifiés et expérimentés dans leurs domaines"
        },
        {
            icon: <MonitorPlay className="w-5 h-5 text-primary" />,
            text: "Flexibilité d'apprentissage : présentiel, en ligne et hybride"
        },
        {
            icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
            text: "Approche concrète et orientée vers la pratique"
        },
        {
            icon: <Award className="w-5 h-5 text-primary" />,
            text: "Amélioration de l'efficacité et de la performance professionnelle"
        }
    ];

    return (
        <section id="apropos" className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-start gap-12 mb-16">

                    {/* Text Content - Left Side */}
                    <div className="lg:w-1/2 animate-fade-in-left">


                        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-8 leading-tight">
                            QUI <span className="text-primary">SOMMES-NOUS ?</span>
                        </h2>

                        <div className="space-y-6 text-muted-foreground font-opensans text-lg leading-relaxed">
                            <p>
                                Filiale du groupe <span className="font-semibold text-foreground">Mayelia Participations</span>,
                                <span className="font-semibold text-foreground"> Mayelia Academy</span> est un hub de formation créé en 2023.
                                Le centre est dédié à la formation, l'apprentissage, au perfectionnement et au renforcement des capacités
                                des étudiants et des professionnels dans les métiers de l'automobile, de l'informatique, du service client
                                et de la santé et sécurité au travail (SST).
                            </p>
                            <p>
                                Mayelia Academy est un centre de formation dynamique et innovant, offrant des formations sur mesure,
                                adaptées aux évolutions du marché de l'emploi. Nos programmes sont conçus et dispensés par des experts certifiés,
                                reconnus pour leur engagement dans le développement des compétences et l'insertion professionnelle.
                            </p>
                        </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="lg:w-1/2 relative animate-fade-in-right">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                            <img
                                src={aboutImage}
                                alt="Nos Formations Mayelia Academy"
                                className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-full blur-2xl opacity-60"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-40"></div>
                    </div>
                </div>

                {/* Features List & Conclusion */}
                <div className="relative bg-white/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/40 shadow-[0_15px_40px_rgba(0,0,0,0.04)] animate-fade-in-up overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-10">
                            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-3">
                                Une approche <span className="text-primary italic">structurée</span> pour exceller
                            </h3>
                            <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-primary rounded-full"></div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 hover:bg-white transition-all duration-500 border border-white/60 hover:border-primary/20 hover:shadow-[0_10px_25px_rgba(0,0,0,0.03)] relative"
                                >
                                    <div className="mb-4 p-3 bg-primary/5 group-hover:bg-primary group-hover:text-white rounded-xl transition-all duration-500 shadow-sm">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h4 className="font-poppins text-foreground font-semibold text-base leading-snug group-hover:text-primary transition-colors duration-300">
                                        {feature.text}
                                    </h4>

                                    {/* Small accent line on hover */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-0 group-hover:w-6 h-0.5 bg-primary/30 rounded-full transition-all duration-500"></div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center w-full max-w-3xl mx-auto">
                            <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 relative">
                                <p className="text-muted-foreground font-opensans text-base leading-relaxed relative z-10 italic">
                                    "Nos formations disponibles en présentiel, en ligne et en format hybride, garantissent une application directe des compétences pour faire de chaque apprenant un professionnel <span className="text-foreground font-semibold">immédiatement opérationnel</span>."
                                </p>
                                {/* Quote mark decoration - smaller */}
                                <div className="absolute top-0 left-4 text-primary/5 text-6xl font-serif select-none -translate-y-3">“</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
