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
            question: "Pourquoi choisir Mayelia Academy pour se former ?",
            answer: "Mayelia Academy offre une formation pratique, professionnalisante axée sur l'employabilité, dispensée par des experts certifiés."
        },
        {
            question: "Quels avantages exclusifs offrent vos formations ?",
            answer: "Nous offrons une formation orientée terrain, des stages pratiques et un accompagnement à l'insertion professionnelle."
        },
        {
            question: "Peut-on travailler après une formation à Mayelia Academy ?",
            answer: "Oui, nos programmes sont conçus pour favoriser une insertion rapide grâce à nos liens avec les filiales du groupe Mayelia et nos partenaires."
        },
        {
            question: "Vos formations sont-elles ouvertes aux débutants ?",
            answer: "Oui, certains programmes sont accessibles sans prérequis, avec un apprentissage progressif et encadré."
        },
        {
            question: "Les formations sont-elles accessibles financièrement ?",
            answer: "Oui, nos tarifs sont étudiés pour rester accessibles, avec des facilités de paiement selon les programmes."
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
