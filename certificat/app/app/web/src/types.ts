export interface Participant {
  id: number;
  civility: string;
  fullName: string;
  createdAt: string;
  _count?: { certificates: number };
}

export interface Training {
  id: number;
  title: string;
  client: string | null;
  startDate: string;
  endDate: string;
  issuePlace: string;
  issueDate: string;
  createdAt: string;
  _count?: { certificates: number };
  certificates?: Certificate[];
}

export interface Certificate {
  id: number;
  ref: string;
  validated: boolean;
  createdAt: string;
  participantId: number;
  trainingId: number;
  participant: Participant;
  training: Training;
}
