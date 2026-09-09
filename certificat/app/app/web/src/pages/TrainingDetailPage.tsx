import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import type { Participant, Training } from "../types";

export default function TrainingDetailPage() {
  const { id } = useParams();
  const trainingId = Number(id);
  const [training, setTraining] = useState<Training | null>(null);
  const [allParticipants, setAllParticipants] = useState<Participant[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newCivility, setNewCivility] = useState("M.");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const [t, parts] = await Promise.all([api.trainings.get(trainingId), api.participants.list()]);
    setTraining(t);
    setAllParticipants(parts);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [trainingId]);

  const enrolledIds = useMemo(
    () => new Set((training?.certificates || []).map((c) => c.participantId)),
    [training]
  );

  const candidates = useMemo(
    () =>
      allParticipants
        .filter((p) => !enrolledIds.has(p.id))
        .filter((p) => p.fullName.toLowerCase().includes(search.toLowerCase())),
    [allParticipants, enrolledIds, search]
  );

  function toggle(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleAddNewParticipant(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const created = await api.participants.create({ civility: newCivility, fullName: newName.trim() });
      await api.certificates.create(created.id, trainingId);
      setNewName("");
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleEnrollSelected() {
    if (selectedIds.size === 0) return;
    setBusy(true);
    setError(null);
    try {
      await api.certificates.bulkCreate(trainingId, Array.from(selectedIds));
      setSelectedIds(new Set());
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleRemoveCertificate(certId: number) {
    if (!confirm("Retirer ce participant de la formation ? Son certificat (REF) sera supprimé.")) return;
    setBusy(true);
    try {
      await api.certificates.remove(certId);
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!training) return <p className="muted">Chargement...</p>;

  return (
    <div>
      <p><Link to="/">&larr; Toutes les formations</Link></p>
      <div className="page-header">
        <h1>{training.title}</h1>
        {(training.certificates?.length || 0) > 0 && (
          <a className="btn primary" href={api.certificates.zipUrl(trainingId)}>
            ⬇ Télécharger tous les certificats (ZIP)
          </a>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <div className="form-grid">
          <div><span className="muted">Client</span><br />{training.client || "—"}</div>
          <div><span className="muted">Période</span><br />{training.startDate.slice(0, 10)} → {training.endDate.slice(0, 10)}</div>
          <div><span className="muted">Lieu / date d'émission</span><br />{training.issuePlace}, le {training.issueDate.slice(0, 10)}</div>
          <div><span className="muted">Participants inscrits</span><br />{training.certificates?.length || 0}</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Participants inscrits</h2>
        <table>
          <thead>
            <tr>
              <th>Civilité</th>
              <th>Nom</th>
              <th>REF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(training.certificates || []).map((c) => (
              <tr key={c.id}>
                <td>{c.participant.civility}</td>
                <td>{c.participant.fullName}</td>
                <td><code>{c.ref}</code></td>
                <td className="actions-row">
                  <a className="btn" href={api.certificates.pdfUrl(c.id)} target="_blank" rel="noreferrer">Voir PDF</a>
                  <button className="danger" onClick={() => handleRemoveCertificate(c.id)} disabled={busy}>Retirer</button>
                </td>
              </tr>
            ))}
            {(training.certificates || []).length === 0 && (
              <tr><td colSpan={4} className="muted">Aucun participant inscrit encore.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Ajouter des participants</h2>

        <form className="actions-row" onSubmit={handleAddNewParticipant} style={{ marginBottom: 16 }}>
          <select value={newCivility} onChange={(e) => setNewCivility(e.target.value)} style={{ width: 90 }}>
            <option value="M.">M.</option>
            <option value="Mme.">Mme.</option>
          </select>
          <input
            placeholder="Nom complet du nouveau participant"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1, minWidth: 240 }}
          />
          <button className="primary" type="submit" disabled={busy}>+ Ajouter et inscrire</button>
        </form>

        <input
          placeholder="Rechercher un participant existant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <div style={{ maxHeight: 260, overflowY: "auto", border: "1px solid var(--border)", borderRadius: 8 }}>
          <table>
            <tbody>
              {candidates.map((p) => (
                <tr key={p.id} className="clickable" onClick={() => toggle(p.id)}>
                  <td style={{ width: 30 }}>
                    <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => toggle(p.id)} />
                  </td>
                  <td>{p.civility} {p.fullName}</td>
                </tr>
              ))}
              {candidates.length === 0 && (
                <tr><td className="muted">Aucun participant disponible.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <button className="primary" style={{ marginTop: 12 }} onClick={handleEnrollSelected} disabled={busy || selectedIds.size === 0}>
          Inscrire {selectedIds.size > 0 ? `(${selectedIds.size})` : ""} et générer leurs certificats
        </button>
      </div>
    </div>
  );
}
