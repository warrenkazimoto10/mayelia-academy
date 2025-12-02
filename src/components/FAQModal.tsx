import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQModal = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) => {
    const faqItems = [
        {
            question: "Comment s'inscrire à une formation ?",
            answer: "Vous pouvez vous inscrire directement en ligne via notre formulaire de contact, ou en nous appelant. Nos conseillers vous guideront à travers le processus d'inscription."
        },
        {
            question: "Les formations sont-elles certifiantes ?",
            answer: "Oui, la majorité de nos formations délivrent une certification reconnue par l'État ou par nos partenaires industriels, valorisable sur le marché du travail."
        },
        {
            question: "Proposez-vous des facilités de paiement ?",
            answer: "Absolument. Nous proposons des échelonnements de paiement pour permettre au plus grand nombre d'accéder à nos formations de qualité."
        },
        {
            question: "Peut-on suivre les cours en ligne ?",
            answer: "Nous offrons des formats hybrides et 100% en ligne pour certaines formations, afin de s'adapter à votre emploi du temps et à vos contraintes géographiques."
        },
        {
            question: "Aidez-vous à l'insertion professionnelle ?",
            answer: "Oui, notre pôle carrière vous accompagne : refonte de CV, simulation d'entretien et mise en relation avec notre réseau d'entreprises partenaires."
        }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-poppins font-bold text-primary flex items-center gap-2">
                        <HelpCircle className="w-6 h-6" />
                        Questions Fréquentes
                    </DialogTitle>
                    <DialogDescription>
                        Retrouvez ici les réponses aux questions les plus courantes sur Mayelia Academy.
                    </DialogDescription>
                </DialogHeader>

                <Accordion type="single" collapsible className="w-full mt-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-opensans font-semibold text-left hover:text-primary transition-colors">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground font-opensans leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-6 flex justify-end">
                    <Button onClick={() => onOpenChange(false)}>Fermer</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FAQModal;
