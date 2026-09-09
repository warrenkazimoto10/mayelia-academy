<?php

namespace Database\Seeders;

use App\Models\CertParticipant;
use App\Models\CertTraining;
use App\Models\Certificate;
use App\Services\Certificates\RefGenerator;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

/**
 * Importe l'historique des sessions de formation et de leurs participants
 * depuis "LISTE DE NOS PARTICIPANTS DE FORMATION.pdf" (racine du projet).
 *
 * - La civilité n'étant pas précisée dans le document source, tous les
 *   participants sont créés avec "M." par défaut — à corriger au cas par cas
 *   depuis l'admin (Certificats > Participants) si besoin.
 * - Deux sessions ont une date approximative car le document ne précisait
 *   que le mois ("mai 2026") ou aucune date du tout (Tulipe Food / chariots) ;
 *   elles sont signalées ci-dessous et peuvent être corrigées depuis l'admin.
 */
class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        if (CertTraining::count() > 0) {
            return;
        }

        $sessions = [
            [
                'client' => 'MACI',
                'title' => 'Outil de contrôle de gestion et analyse de données',
                'start_date' => '2025-02-17',
                'end_date' => '2025-02-20',
                'participants' => ['Marie Prudence Bationo', 'Fred Kone'],
            ],
            [
                'client' => 'MACI',
                'title' => 'Outil informatique des comptabilités et fiscalités',
                'start_date' => '2025-02-17',
                'end_date' => '2025-02-18',
                'participants' => ['Claver Koffi', 'Noura Kouassi'],
            ],
            [
                'client' => 'MACI',
                'title' => 'Outil informatique de secrétariat et de fiscalité',
                'start_date' => '2025-02-24',
                'end_date' => '2025-02-27',
                'participants' => ['Yann Tanon'],
            ],
            [
                'client' => 'MACI',
                'title' => 'Gestion du patrimoine',
                'start_date' => '2025-03-03',
                'end_date' => '2025-03-05',
                'participants' => ['Toure Abass'],
            ],
            [
                'client' => 'MACI',
                'title' => 'Bureautique pack office',
                'start_date' => '2025-06-02',
                'end_date' => '2025-06-03',
                'participants' => [
                    'Douka Louise', 'Eyrokon Cynthia', 'Djambra Yao Ahou Marie Rosine', 'Goore Rebecca',
                    'Sahi Mansier Jores', 'Adje Reine Patricia', 'Attoumbre Amoin Naomi', 'Bouanh Linda Sylviane',
                ],
            ],
            [
                'client' => 'NSIA Assurances',
                'title' => 'Sécurité routière et conduite défensive',
                'start_date' => '2025-06-03',
                'end_date' => '2025-06-03',
                'participants' => ['Diezou Liliane Pelagie', 'Zeba Guegue Cardaire'],
            ],
            [
                'client' => 'NSIA Assurances',
                'title' => 'Sécurité routière et conduite défensive',
                'start_date' => '2025-09-24',
                'end_date' => '2025-09-24',
                'participants' => [], // « Aucun présent » dans le document source
            ],
            [
                'client' => 'La Route Africaine',
                'title' => 'Soudure Tig Mig',
                'start_date' => '2025-10-13',
                'end_date' => '2025-10-15',
                'participants' => [
                    'Zene Dekaho Fernand', 'Sala Pacom', 'Sekongo Nawa Daniel', 'Anzia Ayemian Daniel',
                    'Traore Vakaba', 'Kouame Kassi Narcisse',
                    'Silue Namogo Ali',
                ],
            ],
            [
                'client' => 'La Route Africaine',
                'title' => 'Maintenance véhicule',
                'start_date' => '2025-10-13',
                'end_date' => '2025-10-16',
                'participants' => ['Kobenan Kouakou', 'Coulibaly Saragolo Joseph', 'Kouyate Drissa', 'Koffi Yao Donatien'],
            ],
            [
                'client' => 'La Route Africaine',
                'title' => 'Conduite de Grue',
                'start_date' => '2025-10-16',
                'end_date' => '2025-10-17',
                'participants' => [
                    'Coulibaly Adama', 'Kouame Kouakou Jean Paul', 'Kouassi Tah Kouablan Jean', 'Krou Ano Boua Lazare',
                ],
            ],
            [
                'client' => 'La Tulipe Food',
                'title' => 'Bureautique',
                'start_date' => '2025-10-14',
                'end_date' => '2025-10-17',
                'participants' => [
                    'Tanobian Emile', 'Tewa Jules', 'Houssou Emmanuel', 'Oupoh Joel', 'Zran Mahomet',
                    'Etchri Anna Maria', "N'Goran Kouame", 'Moro Jean Luc', 'Diabate Falicou', 'Yousif Raby',
                    'Kone Adama', 'Yao Ildever', 'Ouedraogo Deborah', 'Maho Vales', 'Kodia Jessica',
                    'Kone Ousmane', 'Ouattara Marie-Edith', 'Tiemon Leatitia', 'Fofana Kady Anicette',
                    'Doumbia Hamed', 'Diomande Sory', 'Fatokoun Manasse', 'Oba Loic', 'Mady Pregnon',
                    'Agath Amoin Epse Tra Bi',
                ],
            ],
            [
                'client' => 'K1 Mining SA',
                'title' => 'Formation des formateurs',
                'start_date' => '2025-11-03',
                'end_date' => '2025-11-05',
                'participants' => [
                    'Kouame Affoue Rachelle', "N'Cho Regina", 'Sylla Generosa', "M'Bra Bryan", 'Diabate Karim',
                    'Doumbia Moustapha', 'Guei Sokpo Jean Claude', 'Appia Brou Emmanuella', 'Sidibe Kadara Bamody',
                    'Yoboue Firmin Verdier', 'Marico Mariam',
                ],
            ],
            [
                'client' => 'Ngêlê',
                'title' => 'Maintenance des véhicules électriques',
                'start_date' => '2026-03-02',
                'end_date' => '2026-03-04',
                'participants' => [
                    'Traore Mohamed Alpha', 'Ouattara Daouda', 'Degbe Kodjovi', 'Bahan Claude',
                    'Assamoi Ekouho Fabrice', 'Kouakou Brahim', 'Kacou Lidji Georges', 'Djedje Yace Camille',
                    'Kouakou Roland', 'Kore Martial', 'Makre Josué', 'Doukoure Aboubakar', 'Kouyo Hervé',
                    'Toure Moussa', 'Onane Shalom', "Kouakou N'guessan Paul", 'Dohou Serge', 'Kone Aboubacar',
                    'Ouattara Tidjane', 'Soro Issouf', 'Nikiema Ali', 'Yeo Michel', 'Kone Kalpi Raymond',
                    "Ya N'guessan Medard", 'Koulibali Sonfolo', 'Mariko Mohamed', 'Dembele Mohamed',
                    'Assovie Guy Roland Essetchy', 'Kone Salif', 'Badolo Aubin', 'Diarrassouba Aboubacary',
                    'Bosco Woila', 'Zoue David Gogo', 'Toe Alassane', 'Lengane Rock', 'Komlan Jean',
                    'Yeo Edoh Richmond', 'Traore Abdramane', 'Traore Amadou', 'Traore Moussa',
                    'Djo Konan Hugues Geoffroy', 'Cisse Bangaly', 'Diarra Ibrahima', 'Hebie Yves',
                    'Hebie Laurent Jaures', 'Sombie Adama', 'Sourabie Madou', 'Sylla Oumar', 'Desouza Evrad',
                    'Ouattara Soumaïla', 'Kadjo Aimond', 'Kone Sinaly', 'Bamba Gueye Mouhamadou', 'Feuwe Motho',
                    'Nacoulma Adama', 'Traore Lassine',
                ],
            ],
            [
                'client' => 'MACI',
                'title' => 'Gestion de trésorerie',
                'start_date' => '2026-03-30',
                'end_date' => '2026-03-31',
                'participants' => ['Kra Genevieve'],
            ],
            [
                'client' => 'MACI',
                'title' => 'Management commercial',
                'start_date' => '2026-03-01',
                'end_date' => '2026-03-02',
                'participants' => ['Titi Yannick', 'Acka Serge'],
            ],
            [
                // Date approximative : le document source ne précisait que "mai 2026"
                'client' => 'MACI',
                'title' => 'Recyclage de contrôle technique',
                'start_date' => '2026-05-01',
                'end_date' => '2026-05-31',
                'participants' => [
                    'Sanogo Hamed', 'Kouadio Konan Herve', 'Yoboue Euphrasie', 'Yao Moundou Celine',
                    'Nanou Jean Patrice', 'Ano Jean De Dieu', 'Kone Dola', 'Tode Mikhael Ange',
                    "N'Goran Kouassi Achille", 'Kouassi Sam Boris', 'Soro Louise', 'Soro Foungnigue Ibrahim',
                    'Aka Elvis', 'Erokon Cynthia', 'Yapi Flore', 'Brou Arethin', 'Niamke Archille',
                    'Kouakou Kablan Pierre', 'Akpossan Amon', 'Affoumon Youwa Rocksane', 'Kangah Henry Joel',
                    'Fanny Diatou Melessie', 'Yoboue Brigitte', 'Toure Vamouty', 'Cisse Babacar El Ibrahim',
                    'Abo Pacôme', "N'Dri Francois De Sales", 'Sahi Mansier Jores', "N'Goran Aya Joelle",
                    'Behi Koffi Toussain', "Kouakou N'Dri Alphonse", 'Yaon Goulehi', 'Thio Landry',
                    'Cisse Almamy', 'Sinaly Dembele', "N'Goran Kouadio E.", 'Kouakou Abran Angele',
                    'Ouattara Adama', 'Fahe Hermann', 'Koffi Jean Yves', 'Koffi Yao Cedecial',
                    'Diomande Douhin', "N'Guettia Kouadio Jean", 'Dehi Xavier Yannick', 'Sangare Ibrahima',
                    'Brou Kouassi Wilfried Idriss', "N'Guessan Franck", 'Yao Richmonde', 'Mone Chia Francoise',
                    'Kouakou Kouadio Kevin', 'Coulibaly Migafona Abou', 'Tchiame Kouame Epse Yao',
                    'Akpatou Manuella Epse Kouakou', 'Douka Kouadio', 'Pepalla Kouman Arnold',
                    'Gnassou Jean Charles', "Djike Raïssa Epse N'Dri",
                ],
            ],
            [
                'client' => 'K1 Mining SA',
                'title' => 'ICAM',
                'start_date' => '2026-05-27',
                'end_date' => '2026-05-29',
                'participants' => [
                    'Kodjo Laurent', 'Ebrottie Kouadio Joel', "N'Depo Akichi Cyrille Narcisse",
                    'Tetialy Kablan Richard', 'Kossonou Yao Kouman Eric', 'Bamba Ismail',
                    'Coulibaly Abdourahamane Kokinde', 'Sylla Blondel Erudy', 'Diabate Karim', "N'Cho Regina",
                ],
            ],
            [
                'client' => 'K1 Mining SA',
                'title' => 'Lead investigator',
                'start_date' => '2026-05-30',
                'end_date' => '2026-05-30',
                'participants' => [
                    'Kodjo Laurent', 'Ebrottie Kouadio Joel', "N'Depo Akichi Cyrille Narcisse",
                    'Tetialy Kablan Richard', 'Kossonou Yao Kouman Eric', 'Bamba Ismail',
                    'Coulibaly Abdourahamane Kokinde', 'Sylla Blondel Erudy', 'Diabate Karim', "N'Cho Regina",
                ],
            ],
            [
                // Date non précisée dans le document source
                'client' => 'La Tulipe Food',
                'title' => 'Conduite des chariots de manutention',
                'start_date' => '2026-01-01',
                'end_date' => '2026-01-01',
                'participants' => [
                    'Kouie Mahan Olivier', 'Togo Yaya', 'Kouadio Kouakou Jean Michel', 'Togo Sadou',
                    'Kone Ayyoube', 'Sawadogo Harouna', 'Deime Boureima', 'Tia Alexis',
                ],
            ],
        ];

        $participantCache = [];
        $findOrCreateParticipant = function (string $fullName) use (&$participantCache) {
            $key = mb_strtolower(trim($fullName));
            if (! isset($participantCache[$key])) {
                $participantCache[$key] = CertParticipant::create([
                    'civility' => 'M.',
                    'full_name' => trim($fullName),
                ]);
            }

            return $participantCache[$key];
        };

        $refGenerator = app(RefGenerator::class);

        foreach ($sessions as $session) {
            $training = CertTraining::create([
                'title' => $session['title'],
                'client' => $session['client'],
                'start_date' => $session['start_date'],
                'end_date' => $session['end_date'],
                'issue_place' => 'Abidjan',
                'issue_date' => $session['end_date'],
            ]);

            $year = Carbon::parse($training->issue_date)->year;

            foreach ($session['participants'] as $name) {
                $participant = $findOrCreateParticipant($name);

                Certificate::create([
                    'ref' => $refGenerator->generate($year),
                    'cert_participant_id' => $participant->id,
                    'cert_training_id' => $training->id,
                ]);
            }
        }
    }
}
