import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActualiteDetail = () => {
    // In a real app, you'd fetch the article based on ID
    const { id } = useParams<{ id: string }>();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <Button
                    variant="ghost"
                    className="mb-6 flex items-center text-slate-600 hover:text-primary"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour aux Actualités
                </Button>
                <article className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg p-8">
                    <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
                        Titre de l'Actualité #{id}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-6">15 Oct 2025 • 5 min de lecture</p>
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                        <img
                            src="/placeholder-actualite.jpg"
                            alt="Illustration"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <p className="text-lg text-foreground leading-relaxed">
                        Contenu détaillé de l'actualité. Ici vous pouvez développer le texte, ajouter des listes, des citations, etc.
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default ActualiteDetail;
