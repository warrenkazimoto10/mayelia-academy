import type { Participant, Training, Certificate } from "./types";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `Erreur ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  participants: {
    list: (q?: string) => request<Participant[]>(`/participants${q ? `?q=${encodeURIComponent(q)}` : ""}`),
    create: (data: { civility?: string; fullName: string }) =>
      request<Participant>("/participants", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Partial<{ civility: string; fullName: string }>) =>
      request<Participant>(`/participants/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<void>(`/participants/${id}`, { method: "DELETE" }),
  },
  trainings: {
    list: () => request<Training[]>("/trainings"),
    get: (id: number) => request<Training>(`/trainings/${id}`),
    create: (data: {
      title: string;
      client?: string;
      startDate: string;
      endDate: string;
      issuePlace?: string;
      issueDate: string;
    }) => request<Training>("/trainings", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Training>) =>
      request<Training>(`/trainings/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<void>(`/trainings/${id}`, { method: "DELETE" }),
  },
  certificates: {
    list: (filters?: { trainingId?: number; participantId?: number }) => {
      const params = new URLSearchParams();
      if (filters?.trainingId) params.set("trainingId", String(filters.trainingId));
      if (filters?.participantId) params.set("participantId", String(filters.participantId));
      const qs = params.toString();
      return request<Certificate[]>(`/certificates${qs ? `?${qs}` : ""}`);
    },
    create: (participantId: number, trainingId: number) =>
      request<Certificate>("/certificates", { method: "POST", body: JSON.stringify({ participantId, trainingId }) }),
    bulkCreate: (trainingId: number, participantIds: number[]) =>
      request<Certificate[]>("/certificates/bulk", {
        method: "POST",
        body: JSON.stringify({ trainingId, participantIds }),
      }),
    remove: (id: number) => request<void>(`/certificates/${id}`, { method: "DELETE" }),
    verify: (ref: string) => request<Certificate>(`/certificates/verify/${encodeURIComponent(ref)}`),
    pdfUrl: (id: number) => `/api/certificates/${id}/pdf`,
    zipUrl: (trainingId: number) => `/api/certificates/training/${trainingId}/zip`,
  },
};
