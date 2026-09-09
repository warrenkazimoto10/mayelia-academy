<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        if (Faq::count() > 0) {
            return;
        }

        $faqs = [
            ['question' => 'Pourquoi choisir Mayelia Academy pour se former ?', 'answer' => "Mayelia Academy offre une formation pratique, professionnalisante axée sur l'employabilité, dispensée par des experts certifiés."],
            ['question' => 'Quels avantages exclusifs offrent vos formations ?', 'answer' => "Nous offrons une formation orientée terrain, des stages pratiques et un accompagnement à l'insertion professionnelle."],
            ['question' => 'Peut-on travailler après une formation à Mayelia Academy ?', 'answer' => "Oui, nos programmes sont conçus pour favoriser une insertion rapide grâce à nos liens avec les filiales du groupe Mayelia et nos partenaires."],
            ['question' => 'Vos formations sont-elles ouvertes aux débutants ?', 'answer' => "Oui, certains programmes sont accessibles sans prérequis, avec un apprentissage progressif et encadré."],
            ['question' => 'Les formations sont-elles accessibles financièrement ?', 'answer' => "Oui, nos tarifs sont étudiés pour rester accessibles, avec des facilités de paiement selon les programmes."],
            ['question' => 'Les formations sont-elles certifiées ou reconnues ?', 'answer' => "Oui, nos formations sont organisées selon des standards professionnels validés et certaines bénéficient de reconnaissances institutionnelles et sectorielles."],
            ['question' => 'À qui s\'adressent les formations de Mayelia Academy ?', 'answer' => "Nos formations s'adressent aux jeunes diplômés, professionnels du secteur automobile, entrepreneurs et à toute personne souhaitant se spécialiser dans nos différents domaines de formations."],
            ['question' => 'À quelle fréquence démarrez-vous les sessions de formation ?', 'answer' => "Plusieurs sessions sont ouvertes chaque année selon les filières."],
            ['question' => 'Comment être informé des nouvelles formations ?', 'answer' => "Via notre site internet, nos réseaux sociaux ou en contactant directement Mayelia Academy."],
            ['question' => 'Mayelia Academy propose-t-elle des formations pour les entreprises ?', 'answer' => "Oui, nous développons des programmes sur mesure pour les entreprises désirant faire former leurs employés."],
            ['question' => 'Organisez-vous des formations en intra-entreprise ?', 'answer' => "Oui, nos équipes peuvent intervenir directement au sein de votre structure."],
            ['question' => 'Proposez-vous des formations en sécurité routière pour les entreprises ?', 'answer' => "Oui, nous accompagnons les entreprises dans la sensibilisation et la prévention des risques routiers."],
            ['question' => 'Comment devenir partenaire de Mayelia Academy ?', 'answer' => "Il suffit de nous contacter via nos canaux officiels pour étudier un partenariat adapté à vos besoins."],
            ['question' => 'Comment obtenir plus d\'informations sur une formation ?', 'answer' => "Vous pouvez nous contacter par téléphone, par e-mail, via nos réseaux sociaux ou en vous rendant directement dans nos locaux."],
        ];

        foreach ($faqs as $i => $faq) {
            Faq::create([
                'question' => $faq['question'],
                'answer' => $faq['answer'],
                'sort_order' => $i,
                'published' => true,
            ]);
        }
    }
}
