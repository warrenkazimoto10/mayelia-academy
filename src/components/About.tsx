import { CheckCircle2, Users, TrendingUp, Award, MonitorPlay, Target } from 'lucide-react';
import aboutImage from '@/assets/about_us_driver_training.png';
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
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">

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
                                alt="Mayelia Academy Centre de Formation"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
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
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border shadow-lg animate-fade-in-up">
                    <h3 className="text-2xl font-poppins font-bold text-foreground mb-8 text-center">
                        Une approche structurée pour exceller
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-background hover:shadow-md transition-all duration-300 border border-border/50">
                                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                    {feature.icon}
                                </div>
                                <p className="font-opensans text-foreground font-medium">{feature.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center w-full">
                        <p className="text-muted-foreground font-opensans leading-relaxed">
                            Nos formations disponibles en présentiel, en ligne et en format hybride, accessibles à tous les secteurs,
                            intègrent des sessions théoriques, des ateliers pratiques, des études de cas, et des simulations pour permettre
                            une application directe des compétences acquises. En mettant l'accent sur la polyvalence et la préparation opérationnelle,
                            nous nous engageons à faire de chaque apprenant un professionnel immédiatement opérationnel, prêt à relever les défis dans son domaine.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
