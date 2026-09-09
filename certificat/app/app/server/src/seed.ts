import { prisma } from "./db";
import { generateRef } from "./refGenerator";

interface SeedParticipant {
  name: string;
  civility?: string;
}

interface SeedTraining {
  client: string;
  title: string;
  start: string;
  end: string;
  issueDate?: string;
  issuePlace?: string;
  participants: SeedParticipant[];
}

const P = (name: string, civility?: string): SeedParticipant => ({ name, civility });

// Transcribed from "LISTE DE NOS PARTICIPANTS DE FORMATION.pdf".
// Dates without an explicit day in the source ("mai 2026", no date for the
// last "La Tulipe Food" session) use a best-guess placeholder — edit them in
// the app once confirmed.
const TRAININGS: SeedTraining[] = [
  {
    client: "MACI",
    title: "Outil de contrôle de gestion et analyse de données",
    start: "2025-02-17",
    end: "2025-02-20",
    participants: [P("Marie Prudence Bationo"), P("Fred Kone")],
  },
  {
    client: "MACI",
    title: "Outil informatique des comptabilités et fiscalités",
    start: "2025-02-17",
    end: "2025-02-18",
    participants: [P("Claver Koffi"), P("Noura Kouassi")],
  },
  {
    client: "MACI",
    title: "Outil informatique de secrétariat et de fiscalité",
    start: "2025-02-24",
    end: "2025-02-27",
    participants: [P("Yann Tanon")],
  },
  {
    client: "MACI",
    title: "Gestion du patrimoine",
    start: "2025-03-03",
    end: "2025-03-05",
    participants: [P("Toure Abass")],
  },
  {
    client: "MACI",
    title: "Bureautique pack office",
    start: "2025-06-02",
    end: "2025-06-03",
    participants: [
      P("Douka Louise"),
      P("Eyrokon Cynthia"),
      P("Djambra Yao Ahou Marie Rosine"),
      P("Goore Rebecca"),
      P("Sahi Mansier Jores"),
      P("Adje Reine Patricia"),
      P("Attoumbre Amoin Naomi"),
      P("Bouanh Linda Sylviane"),
    ],
  },
  {
    client: "NSIA ASSURANCES",
    title: "Sécurité routière et conduite défensive",
    start: "2025-06-03",
    end: "2025-06-03",
    participants: [P("Diezou Liliane Pelagie"), P("Zeba Guegue Cardaire")],
  },
  // NSIA ASSURANCES - 24 septembre 2025 : "Aucun présent" -> pas de formation à créer.
  {
    client: "LA ROUTE AFRICAINE",
    title: "Soudure Tig Mig",
    start: "2025-10-13",
    end: "2025-10-15",
    participants: [
      P("Zene Dekaho Fernand"),
      P("Sala Pacom"),
      P("Sekongo Nawa Daniel"),
      P("Anzia Ayemian Daniel"),
      P("Traore Vakaba"),
      P("Kouame Kassi Narcisse"),
      P("Silue Namogo Ali"),
    ],
  },
  {
    client: "LA ROUTE AFRICAINE",
    title: "Maintenance véhicule",
    start: "2025-10-13",
    end: "2025-10-16",
    participants: [
      P("Kobenan Kouakou"),
      P("Coulibaly Saragolo Joseph"),
      P("Kouyate Drissa"),
      P("Koffi Yao Donatien"),
    ],
  },
  {
    client: "LA ROUTE AFRICAINE",
    title: "Conduite de Grue",
    start: "2025-10-16",
    end: "2025-10-17",
    participants: [
      P("Coulibaly Adama"),
      P("Kouame Kouakou Jean Paul"),
      P("Kouassi Tah Kouablan Jean"),
      P("Krou Ano Boua Lazare"),
    ],
  },
  {
    client: "LA TULIPE FOOD",
    title: "Bureautique",
    start: "2025-10-14",
    end: "2025-10-17",
    participants: [
      P("Tanobian Emile"),
      P("Tewa Jules"),
      P("Houssou Emmanuel"),
      P("Oupoh Joel"),
      P("Zran Mahomet"),
      P("Etchri Anna Maria"),
      P("N'Goran Kouame"),
      P("Moro Jean Luc"),
      P("Diabate Falicou"),
      P("Yousif Raby"),
      P("Kone Adama"),
      P("Yao Ildever"),
      P("Ouedraogo Deborah"),
      P("Maho Vales"),
      P("Kodia Jessica"),
      P("Kone Ousmane"),
      P("Ouattara Marie-Edith"),
      P("Tiemon Leatitia"),
      P("Fofana Kady Anicette"),
      P("Doumbia Hamed"),
      P("Diomande Sory"),
      P("Fatokoun Manasse"),
      P("Oba Loic"),
      P("Mady Pregnon"),
      P("Agath Amoin Epse Tra Bi", "Mme."),
    ],
  },
  {
    client: "K1 Mining SA",
    title: "Formation des formateurs",
    start: "2025-11-03",
    end: "2025-11-05",
    participants: [
      P("Kouame Affoue Rachelle", "Mme."),
      P("N'Cho Regina", "Mme."),
      P("Sylla Generosa"),
      P("M'Bra Bryan"),
      P("Diabate Karim"),
      P("Doumbia Moustapha"),
      P("Guei Sokpo Jean Claude"),
      P("Appia Brou Emmanuella", "Mme."),
      P("Sidibe Kadara Bamody"),
      P("Yoboue Firmin Verdier"),
      P("Marico Mariam", "Mme."),
    ],
  },
  {
    client: "NGÊLÊ",
    title: "Maintenance des véhicules électriques",
    start: "2026-03-02",
    end: "2026-03-04",
    participants: [
      P("Traore Mohamed Alpha"),
      P("Ouattara Daouda"),
      P("Degbe Kodjovi"),
      P("Bahan Claude"),
      P("Assamoi Ekouho Fabrice"),
      P("Kouakou Brahim"),
      P("Kacou Lidji Georges"),
      P("Djedje Yace Camille"),
      P("Kouakou Roland"),
      P("Kore Martial"),
      P("Makre Josué"),
      P("Doukoure Aboubakar"),
      P("Kouyo Hervé"),
      P("Toure Moussa"),
      P("Onane Shalom"),
      P("Kouakou N'guessan Paul"),
      P("Dohou Serge"),
      P("Kone Aboubacar"),
      P("Ouattara Tidjane"),
      P("Soro Issouf"),
      P("Nikiema Ali"),
      P("Yeo Michel"),
      P("Kone Kalpi Raymond"),
      P("Ya N'guessan Medard"),
      P("Koulibali Sonfolo"),
      P("Mariko Mohamed"),
      P("Dembele Mohamed"),
      P("Assovie Guy Roland Essetchy"),
      P("Kone Salif"),
      P("Badolo Aubin"),
      P("Diarrassouba Aboubacary"),
      P("Bosco Woila"),
      P("Zoue David Gogo"),
      P("Toe Alassane"),
      P("Lengane Rock"),
      P("Komlan Jean"),
      P("Yeo Edoh Richmond"),
      P("Traore Abdramane"),
      P("Traore Amadou"),
      P("Traore Moussa"),
      P("Djo Konan Hugues Geoffroy"),
      P("Cisse Bangaly"),
      P("Diarra Ibrahima"),
      P("Hebie Yves"),
      P("Hebie Laurent Jaures"),
      P("Sombie Adama"),
      P("Sourabie Madou"),
      P("Sylla Oumar"),
      P("Desouza Evrad"),
      P("Ouattara Soumaïla"),
      P("Kadjo Aimond"),
      P("Kone Sinaly"),
      P("Bamba Gueye Mouhamadou"),
      P("Feuwe Motho"),
      P("Nacoulma Adama"),
      P("Traore Lassine"),
    ],
  },
  {
    client: "MACI",
    title: "Gestion de trésorerie",
    start: "2026-03-30",
    end: "2026-03-31",
    participants: [P("Kra Genevieve", "Mme.")],
  },
  {
    client: "MACI",
    title: "Management commercial",
    start: "2026-03-01",
    end: "2026-03-02",
    participants: [P("Titi Yannick"), P("Acka Serge")],
  },
  {
    client: "MACI",
    title: "Recyclage de contrôle technique",
    start: "2026-05-01",
    end: "2026-05-01",
    participants: [
      P("Sanogo Hamed"),
      P("Kouadio Konan Herve"),
      P("Yoboue Euphrasie", "Mme."),
      P("Yao Moundou Celine", "Mme."),
      P("Nanou Jean Patrice"),
      P("Ano Jean De Dieu"),
      P("Kone Dola"),
      P("Tode Mikhael Ange"),
      P("N'Goran Kouassi Achille"),
      P("Kouassi Sam Boris"),
      P("Soro Louise", "Mme."),
      P("Soro Foungnigue Ibrahim"),
      P("Aka Elvis"),
      P("Erokon Cynthia", "Mme."),
      P("Yapi Flore", "Mme."),
      P("Brou Arethin"),
      P("Niamke Archille"),
      P("Kouakou Kablan Pierre"),
      P("Akpossan Amon"),
      P("Affoumon Youwa Rocksane", "Mme."),
      P("Kangah Henry Joel"),
      P("Fanny Diatou Melessie", "Mme."),
      P("Yoboue Brigitte", "Mme."),
      P("Toure Vamouty"),
      P("Cisse Babacar El Ibrahim"),
      P("Abo Pacôme"),
      P("N'Dri Francois De Sales"),
      P("Sahi Mansier Jores"),
      P("N'Goran Aya Joelle", "Mme."),
      P("Behi Koffi Toussain"),
      P("Kouakou N'Dri Alphonse"),
      P("Yaon Goulehi"),
      P("Thio Landry"),
      P("Cisse Almamy"),
      P("Sinaly Dembele"),
      P("N'Goran Kouadio E."),
      P("Kouakou Abran Angele", "Mme."),
      P("Ouattara Adama"),
      P("Fahe Hermann"),
      P("Koffi Jean Yves"),
      P("Koffi Yao Cedecial"),
      P("Diomande Douhin"),
      P("N'Guettia Kouadio Jean"),
      P("Dehi Xavier Yannick"),
      P("Sangare Ibrahima"),
      P("Brou Kouassi Wilfried Idriss"),
      P("N'Guessan Franck"),
      P("Yao Richmonde"),
      P("Mone Chia Francoise", "Mme."),
      P("Kouakou Kouadio Kevin"),
      P("Coulibaly Migafona Abou"),
      P("Tchiame Kouame Epse Yao", "Mme."),
      P("Akpatou Manuella Epse Kouakou", "Mme."),
      P("Douka Kouadio"),
      P("Pepalla Kouman Arnold"),
      P("Gnassou Jean Charles"),
      P("Djike Raïssa Epse N'Dri", "Mme."),
    ],
  },
  {
    client: "K1 Mining SA",
    title: "« ICAM » INCIDENT CAUSE ANALYSIS METHOD",
    start: "2026-05-27",
    end: "2026-05-29",
    issueDate: "2026-06-10",
    participants: [
      P("Kodjo Laurent"),
      P("Ebrottie Kouadio Joel"),
      P("Coulibaly Abdourahamane"),
      P("N'Depo Akichi Cyrille"),
      P("Tettaly Kablan Richard"),
      P("Diabate Karim"),
      P("N'Cho Regina", "Mme."),
      P("Bamba Ismaïl"),
      P("Kossonou Yao Kouman Eric"),
      P("Sylla Blondel Erudy"),
    ],
  },
  {
    client: "K1 Mining SA",
    title: "Lead Investigator",
    start: "2026-05-30",
    end: "2026-05-30",
    issueDate: "2026-06-10",
    participants: [
      P("Kodjo Laurent"),
      P("Ebrottie Kouadio Joel"),
      P("Coulibaly Abdourahamane"),
      P("N'Depo Akichi Cyrille"),
      P("Tettaly Kablan Richard"),
      P("Diabate Karim"),
      P("N'Cho Regina", "Mme."),
      P("Bamba Ismaïl"),
      P("Kossonou Yao Kouman Eric"),
      P("Sylla Blondel Erudy"),
    ],
  },
  {
    client: "LA TULIPE FOOD",
    title: "Conduite des chariots de manutention",
    start: "2025-10-17",
    end: "2025-10-17",
    participants: [
      P("Kouie Mahan Olivier"),
      P("Togo Yaya"),
      P("Kouadio Kouakou Jean Michel"),
      P("Togo Sadou"),
      P("Kone Ayyoube"),
      P("Sawadogo Harouna"),
      P("Deime Boureima"),
      P("Tia Alexis"),
    ],
  },
];

function normalize(name: string) {
  return name.trim().replace(/\s+/g, " ").toUpperCase();
}

async function getOrCreateParticipant(name: string, civility?: string) {
  const key = normalize(name);
  const existing = await prisma.participant.findFirst({
    where: { fullName: { equals: key } },
  });
  if (existing) return existing;
  return prisma.participant.create({
    data: { fullName: key, civility: civility || "M." },
  });
}

async function main() {
  let trainingCount = 0;
  let certificateCount = 0;

  for (const t of TRAININGS) {
    const startDate = new Date(t.start);
    const endDate = new Date(t.end);
    const issueDate = new Date(t.issueDate || t.end);

    let training = await prisma.training.findFirst({
      where: { title: t.title, startDate, client: t.client },
    });
    if (!training) {
      training = await prisma.training.create({
        data: {
          client: t.client,
          title: t.title,
          startDate,
          endDate,
          issueDate,
          issuePlace: t.issuePlace || "Abidjan",
        },
      });
      trainingCount++;
    }

    for (const p of t.participants) {
      const participant = await getOrCreateParticipant(p.name, p.civility);
      const existingCert = await prisma.certificate.findUnique({
        where: { participantId_trainingId: { participantId: participant.id, trainingId: training.id } },
      });
      if (!existingCert) {
        const ref = await generateRef(issueDate);
        await prisma.certificate.create({
          data: { participantId: participant.id, trainingId: training.id, ref },
        });
        certificateCount++;
      }
    }
  }

  console.log(`Seed terminé : ${trainingCount} formations créées, ${certificateCount} certificats générés.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
